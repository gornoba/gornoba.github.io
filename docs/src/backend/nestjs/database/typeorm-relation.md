# TypeORM Relations

[TypeORM Relations](https://docs.nestjs.com/techniques/database#relations)<br/>
[Github Link](https://github.com/gornoba/nestjs-describe/tree/75ae3fddc01248d11171a41d11a64f7e752461c6)

## Relations

MySQL이나 PostgreSQL 같은 관계형 RDMS는 너랑 나랑 연결고리를 만드는 relation이 있습니다.  
`One-to-one`: 1대1 관계 입니다. 너랑 나랑 동등해야 하니 unique로 relation이 맺어 집니다.
`One-to-many / Many-to-one`: 이 하나가 많아진다 그럼 one-to-many, 많은게 하나로 좁혀진다. 그럼 many-to-one 입니다. 예를들어 cats 테이블에 user가 create를 한다고 했을 떄 1명의 user가 여러마리의 고양이를 입력할 수 있습니다. 그럼 one-to-many는 user고 many-to-one은 cats가 됩니다.
`Many-to-many`: 다대다 관계이고 생성시 중간 테이블이 생깁니다.

## 구현

```typescript
// catsEntity
@ManyToOne(() => UserEntity, (user) => user.cat)
@JoinColumn({
  name: 'user_id',
  referencedColumnName: 'id',
})
user: Relation<UserEntity[]>;

// userEntity
@OneToMany(() => CatsEntity, (cat) => cat.user)
cat: Relation<CatsEntity>;
```

위와 같이 코드를 구현하면 cats 테이블에 user_id라는 컬럼이 생기게 됩니다.

### user insert

user를 넣어줄떄는 user 테이블에서 user가 있는지 확인하고 entity로 넣어주는 것이 좋습니다.  
하지만 user는 로그인할때 session에 있습니다. 그러므로 cls를 이용해보도록 하겠습니다.

```typescript
// app.module.ts
ClsModule.forRoot({
  global: true,
  middleware: {
    mount: true,
    setup: (cls, req) => {
      const session = req.session;
      if (session?.user) {
        const userEntity = new UserEntity({
          id: session.user.id,
        });

        cls.set('userId', userEntity);
      }
    },
  },
}),
```

이제 어디서든 `cls.get('userId')`로 user Entity를 가져올 수 있게 되었습니다.

### repository

```typescript {32-34}
async upsert(
  entity: EntityTarget<T>,
  data: DeepPartial<T[]>,
): Promise<T[] | T> {
  const queryRunner: EntityManager = this.cls.get('transaction');
  const userInfo = this.cls.get('userId');
  const repository = queryRunner.getRepository<T>(entity);
  const tmpArr = [];

  for (const item of data) {
    try {
      if (item?.id) {
        const findOne = await this.find(entity, {
          where: { id: item.id },
        });

        if (!findOne) {
          throw new BadRequestException(`${item.id} Not found`);
        }

        const updatData = Object.assign(findOne, item);
        tmpArr.push(updatData);
      } else {
        tmpArr.push(item);
      }
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  if (userInfo) {
    tmpArr.forEach((item) => {
      item.user = userInfo;
    });
  }
  const result = await repository.save(tmpArr);
  return result.length === 1 ? (result[0] as T) : (result as T[]);
}
```

이제 user와 관계성이 있는 entity의 column은 user로 당첨입니다.  
save의 좋은점은 column이 있으면 넣고 없으면 넣지 않습니다.  
이렇게 해서 고양이를 하나 만들어 보면 user가 연결된 것을 볼 수 있습니다.
