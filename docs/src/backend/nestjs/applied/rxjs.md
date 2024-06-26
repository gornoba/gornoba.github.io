# RxJs

[RxJs](https://rxjs.dev/)<br/>
[Michael Guay - RxJs Mapping Operators Made Easy](https://www.youtube.com/watch?v=ddyUIjtRcK0&t=1s)<br/>

RxJS(Reactive Extensions for JavaScript)는 비동기 및 이벤트 기반 프로그램을 구성하기 위한 라이브러리입니다. RxJS는 옵저버블(Observable) 패턴을 사용하여 데이터 스트림과 프로미스를 쉽게 조작할 수 있도록 합니다. 이를 통해 다양한 비동기 데이터 소스(예: HTTP 요청, 사용자 입력, 파일 시스템 작업 등)를 효율적으로 처리할 수 있습니다.

## 핵심 개념

- 옵저버블(Observable): 데이터나 이벤트의 스트림을 나타내며, 이 스트림은 시간에 따라 여러 값을 방출할 수 있습니다.
- 옵저버(Observer): 옵저버블이 방출하는 값을 소비하는 객체로, next, error, complete와 같은 메소드를 가집니다. 이 메소드들은 옵저버블에서 값을 받을 때, 에러가 발생했을 때, 스트림이 완료되었을 때 호출됩니다.
- 구독(Subscription): 옵저버블에 옵저버를 연결합니다. 옵저버블이 데이터를 방출할 때마다 옵저버의 next 메소드가 호출됩니다. 구독을 해제하면 더 이상 데이터를 받지 않습니다.
- 연산자(Operators): 옵저버블 스트림을 변환하거나 조합하는 데 사용됩니다. 예를 들어, map, filter, concat, merge와 같은 연산자가 있습니다.
- 주제(Subject): 옵저버에게 동시에 값을 방출할 수 있습니다.하나의 Subject는 여러 옵저버에게 데이터를 방출할 수 있으며, 옵저버블과 옵저버의 역할을 동시에 할 수 있습니다. Subject는 데이터를 방출하는 소스로 사용될 수 있으며, .next(), .error(), .complete() 메소드를 통해 직접 데이터를 방출할 수 있습니다.
- 스케줄러(Scheduler): 옵저버블의 작업 실행을 관리하는 컴포넌트입니다. 작업이 실행되는 컨텍스트(즉, 시간)를 제어합니다. 예를 들어, 즉시 실행, 비동기적으로 실행, 애니메이션 프레임에서 실행 등의 작업 실행 방식을 결정합니다. 이를 통해 개발자는 옵저버블의 동작을 더 세밀하게 제어할 수 있으며, 특히 비동기 작업의 타이밍을 정밀하게 조절할 수 있습니다.

## 작동 방식

RxJS는 함수형 프로그래밍 패러다임을 따릅니다. 이는 불변성(Immutable)과 순수 함수(Pure Function)를 중시하여 사이드 이펙트(Side Effects)를 최소화하고, 프로그램의 예측 가능성과 테스트 용이성을 높입니다.

옵저버블은 "lazy"합니다. 즉, 옵저버가 구독하기 전까지는 어떤 작업도 실행하지 않습니다. 이 특성은 자원을 효율적으로 사용할 수 있게 하며, 필요할 때에만 데이터를 처리하도록 합니다.

## 메타포

"영화관" 메타포를 사용해 RxJS의 개념들을 설명해 보겠습니다. 이 상황에서 당신은 최신 영화를 보기 위해 영화관에 갔다고 상상해 보세요.

### Observable (옵저버블)

옵저버블은 영화 상영 자체입니다. 영화가 상영되는 동안, 화면에는 여러 장면이 연속적으로 나타나며, 이는 시간에 따라 데이터(장면)가 방출되는 것과 유사합니다. 영화는 시작하기 전까지는 어떤 장면도 상영되지 않습니다. 즉, 영화가 시작되는 순간(구독하는 순간)부터 데이터(장면)가 방출됩니다.

### Observer (옵저버)

옵저버는 영화를 보러 온 당신입니다. 영화가 상영될 때, 여러 장면(데이터)을 경험합니다. 만약 영화가 마음에 들면 계속 관람하고(정상적인 데이터 처리), 영화가 마음에 들지 않으면 극장을 떠나거나(에러 처리), 영화가 끝나면 집으로 돌아가는 것(완료 처리)과 같습니다.

### Subscription (구독)

구독은 당신이 영화 표를 구매하고 극장에 들어가 영화를 관람하기 시작하는 과정입니다. 이것은 당신이 옵저버블(영화)과 상호작용을 시작하는 순간입니다. 영화 관람을 중단하고 싶다면, 언제든지 극장을 나갈 수 있으며, 이는 구독을 취소하는 것과 같습니다.

### Operators (연산자)

연산자는 영화를 보는 동안 사용할 수 있는 특별한 안경입니다. 예를 들어, 3D 영화를 보기 위한 3D 안경이나 특정 장면의 색감을 조정하는 필터 안경 등이 있을 수 있습니다. 이 안경들은 당신이 영화를 경험하는 방식(데이터 스트림을 처리하는 방식)을 변화시킵니다.

### Subject (주제)

주제는 영화 상영관 자체로 생각할 수 있습니다. 상영관은 한 번에 여러 관객(옵저버)에게 같은 영화(데이터 스트림)를 상영할 수 있습니다. 만약 새로운 관객이 중간에 들어오면, 그 순간부터 영화를 같이 볼 수 있습니다. 또한, 여러 상영관에서 동일한 영화를 동시에 상영할 수도 있습니다.

### Scheduler (스케줄러)

스케줄러는 영화 상영 일정을 조정하는 극장 매니저로 생각할 수 있습니다. 이 매니저는 영화가 언제 상영될지, 어떤 상영관에서 볼 수 있는지를 결정합니다. 또한, 관객들이 영화를 보는 경험(데이터 스트림의 처리 시기와 방식)을 최적화하기 위해 여러 상영 시간대를 조정할 수 있습니다.
