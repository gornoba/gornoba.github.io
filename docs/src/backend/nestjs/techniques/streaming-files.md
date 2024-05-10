# Streaming files

## 사용예시

```typescript
import { Controller, Get, StreamableFile, Res } from "@nestjs/common";
import { createReadStream } from "fs";
import { join } from "path";
import type { Response } from "express";

@Controller("file")
export class FileController {
  @Get()
  getFile(@Res({ passthrough: true }) res: Response): StreamableFile {
    const file = createReadStream(join(process.cwd(), "package.json"));
    res.set({
      "Content-Type": "application/json",
      "Content-Disposition": 'attachment; filename="package.json"',
    });
    return new StreamableFile(file);
  }

  // Or even:
  @Get()
  @Header("Content-Type", "application/json")
  @Header("Content-Disposition", 'attachment; filename="package.json"')
  getStaticFile(): StreamableFile {
    const file = createReadStream(join(process.cwd(), "package.json"));
    return new StreamableFile(file);
  }
}
```

## 실사용기

사실 로컬에 있는 파일보다 클라우드에 있는 파일을 바로 stream 할때가 많을 것입니다.  
gcp storage나 aws s3에서 파일을 stream 하는 경우에는 StreamableFile가 되지 않았습니다.  
그래서 cloud를 이용할 경우에는 file.pipe(res)를 이용하고 있습니다.
