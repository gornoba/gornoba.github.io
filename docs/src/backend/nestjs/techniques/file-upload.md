# File upload

환절가 되고 습기가 많아지니 몸 상태 좋지 않네요. 모두 항상 건강 유의하시길 바랍니다.  
NestJs에서는 file을 multer를 이용하여 업로드 합니다.

## 설치

```sh
npm i -D @types/multer
```

## 구현

[Github Link](https://github.com/gornoba/nestjs-describe/tree/9a55fcc49916e0f1f3c2ce0dd6740700ba1b83fe)<br/>

controller에서는 Post로 파일 받습니다.  
단일은 FileInterceptor, 다수는 FilesInterceptor를 사용하게 됩니다. 첫번째 인수는 파일이름, 두번째 인수는 [여기](https://github.com/expressjs/multer#multeropts)를 참고하면 될 것 같습니다.  
validation은 ParseFilePipe와 ParseFilePipeBuilder 를 사용할 수 있는데 ParseFilePipeBuilder가 사용하기가 더 간편하고 문법이 보기 좋은 것 같습니다.  
swagger는 dto를 만들어 구성하면 쉽게 파일을 올리는 것을 테스트 해볼 수 있습니다.

```typescript
@Controller("file")
export class FileController {
  @Post("upload")
  @UseInterceptors(FileInterceptor("file"))
  @ApiConsumes("multipart/form-data")
  @ApiBody({
    description: "List of cats",
    type: FileUploadDto,
  })
  uploadFile(
    @UploadedFile(
      new ParseFilePipeBuilder()
        .addFileTypeValidator({
          fileType: new RegExp("image/*"),
        })
        .addMaxSizeValidator({
          maxSize: 1024 * 1024 * 2,
        })
        .build({
          errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
        })
    )
    file: Express.Multer.File
  ) {
    console.log(file);
  }

  @Post("uploads")
  @UseInterceptors(FilesInterceptor("files"))
  @ApiConsumes("multipart/form-data")
  @ApiBody({
    description: "List of cats",
    type: FilesUploadDto,
  })
  uploadFiles(
    @UploadedFiles(
      new ParseFilePipeBuilder()
        .addFileTypeValidator({
          fileType: new RegExp("image/*"),
        })
        .addMaxSizeValidator({
          maxSize: 1024 * 1024 * 2,
        })
        .build({
          errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
        })
    )
    files: Array<Express.Multer.File>
  ) {
    console.log(files);
  }
}
```

## AWS S3

아마도 사용하시는 분들의 대부분은 파일을 s3와 같은 storage를 이용하실 겁니다.  
그와 관련된 것도 github에 올려놓았으니 참고하시면 좋을 것 같습니다.
