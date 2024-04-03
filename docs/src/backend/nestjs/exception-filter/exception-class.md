# Exception Class

| Name                             |                                                                                                                 Description |
| :------------------------------- | --------------------------------------------------------------------------------------------------------------------------: |
| BadRequestException              |                                                400 상태 코드를 나타냅니다. 클라이언트가 잘못된 요청을 보냈을 때 사용합니다. |
| UnauthorizedException            |                               401 상태 코드를 나타냅니다. 인증 실패 또는 토큰 누락 등의 이유로 인증이 필요할 때 사용합니다. |
| NotFoundException                |                                                     404 상태 코드를 나타냅니다. 요청한 리소스를 찾을 수 없을 때 사용합니다. |
| ForbiddenException               |                                             403 상태 코드를 나타냅니다. 사용자가 리소스에 접근할 권한이 없을 때 사용합니다. |
| NotAcceptableException           |                              406 상태 코드를 나타냅니다. 요청한 리소스의 MIME 타입이 서버에서 생성할 수 없을 때 사용합니다. |
| RequestTimeoutException          |                      408 상태 코드를 나타냅니다. 클라이언트의 요청이 서버에서 정한 시간 내에 완료되지 않았을 때 사용합니다. |
| ConflictException                |                                                 409 상태 코드를 나타냅니다. 요청이 서버의 현재 상태와 충돌할 때 사용합니다. |
| GoneException                    |                     410 상태 코드를 나타냅니다. 요청한 리소스가 더 이상 사용할 수 없고 영구적으로 이동되었을 때 사용합니다. |
| PayloadTooLargeException         |                                                          413 상태 코드를 나타냅니다. 요청 페이로드가 너무 클 때 사용합니다. |
| PreconditionFailedException      |                                             412 상태 코드를 나타냅니다. 서버에서 요청의 전제 조건이 실패했을 때 사용합니다. |
| UnsupportedMediaTypeException    |                                        415 상태 코드를 나타냅니다. 요청이 지원되지 않는 미디어 타입을 사용할 때 사용합니다. |
| ImATeapotException               |                           418 상태 코드를 나타냅니다. 이스터 에그로 사용되며, 실제로는 실용적인 용도로 사용되지는 않습니다. |
| InternalServerErrorException     |                                                        500 상태 코드를 나타냅니다. 서버 내부 오류가 발생했을 때 사용합니다. |
| MethodNotAllowedException        |                                                    405 상태 코드를 나타냅니다. 요청된 메소드가 허용되지 않을 때 사용합니다. |
| NotImplementedException          |                                           501 상태 코드를 나타냅니다. 요청된 기능이 서버에서 구현되지 않았을 때 사용합니다. |
| BadGatewayException              |                             502 상태 코드를 나타냅니다. 게이트웨이 또는 프록시 서버에서 잘못된 응답을 받았을 때 사용합니다. |
| ServiceUnavailableException      | 503 상태 코드를 나타냅니다. 서버가 요청을 처리할 준비가 되지 않았을 때, 일반적으로 유지 보수 또는 과부하로 인해 사용합니다. |
| GatewayTimeoutException          |                                        504 상태 코드를 나타냅니다. 게이트웨이가 시간 내에 응답을 받지 못했을 때 사용합니다. |
| HttpVersionNotSupportedException |                        505 상태 코드를 나타냅니다. 서버가 요청에서 사용된 HTTP 프로토콜 버전을 지원하지 않을 때 사용합니다. |
