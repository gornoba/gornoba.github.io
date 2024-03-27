---
# https://vitepress.dev/reference/default-theme-home-page
layout: home

hero:
  name: "Hyunhoo 😁"
  text: "Frontend, Backend, and DevOps Harmony"
  tagline: "Reach out to me at <span class='tagline-email'>gornoba@naver.com</span> for collaboration or inquiries."
  image:
    src: /favicon.ico
    alt: favicon
  actions:
    - theme: brand
      text: 소개글..
      link: /whoiam/introduction

features:
  - icon:
      src: /nestjs.svg
    title: NestJS의 깊이 있는 이해와 실전경험
    details: Framwork 아키텍처에 대한 깊은 이해를 바탕으로 다양한 분야에서 실전적인 문제 해결 능력이 있으며 효과적인 솔루션을 설계하고 구현
    link: https://nestjs.com/
    linkText: NestJs
  - icon:
      src: /postgresql.svg
    title: 강력한 오픈 소스 객체 관계형 데이터베이스 시스템
    details: 고급 기능, 데이터 무결성, 안정성을 제공하며, 복잡한 쿼리, 대용량 데이터, 동시성 처리에 최적화된 솔루션을 구현
    link: https://www.postgresql.org/
    linkText: PostgreSQL
  - icon:
      src: /vue.png
    title: 직관적인 프론트엔드 프레임워크
    details: 선언적 렌더링과 컴포넌트 기반의 아키텍처를 통해 사용자 친화적인 웹 인터페이스를 빠르게 개발
    link: https://vuejs.org/
    linkText: VueJs
  - icon:
      src: /docker.webp
    title: 컨테이너화를 통한 애플리케이션의 빠르고 일관된 배포
    details: 애플리케이션을 컨테이너로 패키징하여, 어떤 환경에서도 동일하게 작동하도록 합니다. 개발부터 운영까지 일관된 환경을 제공
    link: https://www.docker.com/
    linkText: Docker
  - icon:
      src: /kubernetes.svg
    title: 컨테이너 오케스트레이션의 표준
    details: 대규모 컨테이너화된 애플리케이션의 배포, 스케일링, 관리를 자동화합니다. 복잡한 마이크로서비스 아키텍처를 효율적으로 운영
    link: https://kubernetes.io/
    linkText: Kubernetes
  - icon:
      src: /gcp.svg
    title: 안전하고 스마트한 클라우드 Paas 서비스
    details: 높은 성능, 확장성, 안정성을 제공하는 구글의 클라우드 서비스를 통해 혁신적인 솔루션을 빠르게 구현하고 배포
    link: https://cloud.google.com/
    linkText: GCP(Google Cloud Platform)
  - icon:
      src: /aws.png
    title: 가장 포괄적이고 널리 사용되는 클라우드 플랫폼
    details: 안정적인 인프라스트럭처, 무한한 확장성, 다양한 서비스를 통해 어떤 규모의 애플리케이션도 지원합여 혁신을 가속화하고 비즈니스 성장을 이끌어냄
    link: https://aws.amazon.com/
    linkText: AWS(Amazon Web Services)
---

<style> 
.tagline-email {
  color: #007bff; /* 밝은 파란색으로 이메일 텍스트 색상 변경 */
  font-weight: bold; /* 폰트 무게를 굵게 */
  text-decoration: underline; /* 밑줄 추가 */
  font-family: Arial, sans-serif; /* 폰트 패밀리 설정 */
  display: inline-block; /* 박스 모델 조정 */
  margin: 5px 0; /* 마진 추가 */
}
</style>
