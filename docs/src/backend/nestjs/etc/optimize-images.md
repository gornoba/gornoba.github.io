# Sharp

## Webp

1. 고효율 압축: WebP는 손실 및 무손실 압축을 모두 지원합니다. 손실 압축에서는 JPEG에 비해 같은 화질에서 대략 25-34% 정도 파일 크기를 더 줄일 수 있습니다. 무손실 압축에서도 PNG에 비해 26% 정도 파일 크기가 더 작습니다.

2. 투명도 지원: PNG와 같이 투명도(알파 채널)를 지원합니다. 이 경우에도 기존 PNG 대비 파일 크기가 상당히 작으며, GIF 대비 애니메이션 지원 시 훨씬 효율적입니다.

3. 색상 정보: WebP는 8비트의 색상 채널당 최대 24비트의 색상 깊이와 8비트의 알파 채널을 지원하여 총 32비트 컬러를 제공합니다. 이는 고화질 이미지 처리에 적합합니다.

4. 애니메이션 지원: GIF와 유사하게 애니메이션을 지원하지만, 더 작은 파일 크기로 더 높은 화질의 애니메이션 제작이 가능합니다.

## 설치

```sh
npm i sharp
npm i -D @types/sharp
```

## 구현

[Github Link](https://github.com/gornoba/nestjs-describe/commit/6592cdbe1ca1ea969ab48ea36172966715d6a1e0)

```typescript
import { Injectable } from "@nestjs/common";
import sharp from "sharp";

@Injectable()
export class ImageOptimizeService {
  async optimizeImage(image: Buffer): Promise<Buffer> {
    return await sharp(image).rotate().webp({ quality: 80 }).toBuffer();
  }
}
```
