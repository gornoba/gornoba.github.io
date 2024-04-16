# Circular dependency

## Forward References (전방 참조):

forwardRef() 함수를 사용하여 아직 정의되지 않은 클래스를 참조할 수 있습니다. 이는 @Inject() 데코레이터와 함께 사용되어 순환 의존성을 해결합니다. 예를 들어, CatsService와 CommonService가 서로 의존하는 경우, 각 클래스는 forwardRef()를 사용하여 서로를 참조할 수 있습니다.

## ModuleRef 클래스 사용:

순환 의존성이 발생하는 다른 한 쪽에서 ModuleRef 클래스를 사용하여 DI 컨테이너에서 제공자 인스턴스를 검색하는 방법입니다. ModuleRef를 사용하면 구체적인 클래스 인스턴스를 프로그래밍 방식으로 검색하고 생성할 수 있습니다. 이 방법은 forwardRef()를 사용하는 것보다 더 유연할 수 있으며, 동적인 의존성 해결에 유용합니다.

## Module 간의 Forward Reference:

모듈 간의 순환 의존성을 해결하기 위해 forwardRef()를 모듈 수준에서 사용할 수도 있습니다. 예를 들어, CatsModule과 CommonModule이 서로를 필요로 하는 경우, 각 모듈의 imports 배열에서 forwardRef()를 사용하여 서로를 참조할 수 있습니다.
