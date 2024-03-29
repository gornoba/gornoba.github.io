# 로드밸런서 (Load Balancer)

로드밸런서는 로드 밸런싱을 실제로 구현하는 서비스 혹은 장치입니다. AWS에서는 여러 유형의 로드밸런서를 제공하며, 가장 대표적인 것으로는 다음 세 가지가 있습니다.

- Application Load Balancer (ALB): 애플리케이션 레이어(HTTP/HTTPS 트래픽)에서 작동하며, 고급 라우팅 기능(경로 기반 라우팅, 호스트 기반 라우팅 등)을 제공하여 애플리케이션의 요구사항에 따라 트래픽을 더 세밀하게 제어할 수 있습니다.
- Network Load Balancer (NLB): 전송 레이어(TCP/UDP 트래픽)에서 작동하며, 매우 높은 성능과 낮은 지연시간을 필요로 하는 애플리케이션에 적합합니다.
- Classic Load Balancer (CLB): 이전 세대의 로드밸런서로, 간단한 라우팅 기능을 제공합니다. Application 또는 Network 레이어에서 작동할 수 있으나, 신규로 구축하는 애플리케이션에는 ALB나 NLB 사용이 권장됩니다.

## Application Load Balancer 생성

- 네트워크 매핑에서 매핑 선택
- 보안그룹은 EC2와 동일한 보안그룹을 선택하면 좋을 것 같은데 필요하면 새로 만들어도 됩니다.
- 리스너
  - <LinkNewTab href="/aws/ec2/loadBalancing/target-group" text="대상그룹" style="margin: 0;"><template #header>https: 443으로 </template>을 연결해 줍니다.</LinkNewTab>
    - 인증서를 추가해 줍니다.
    - 로드밸런서를 생성하고 생성한 로드밸런서로 들어가 리스너를 추가해줍니다.  
      :::info
      `http:80`  
      `리디렉션 대상 HTTPS://#{host}:443/#{path}?#{query}`
      :::
  - 인증서를 연결하지 않을경우 http: 80으로 리스너를 추가해 줍니다.
