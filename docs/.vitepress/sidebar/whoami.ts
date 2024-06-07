export const whoamiInto = {
  base: "/whoiam/intro/",
  text: "소개글",
  link: "introduction",
  collapsed: true,
};

export const whoamiCompany = {
  base: "/whoiam/company/",
  text: "개발생활",
  collapsed: true,
  items: [
    {
      text: "GCP에서 AWS로 서비스 이전",
      base: "/whoiam/company/gcp-to-aws/",
      link: "gcp-to-aws",
      collapsed: true,
      items: [
        { text: "CI/CD를 AWS로 변경", link: "first-challenge" },
        { text: "EC2에서 무중단배포 구현", link: "second-challenge" },
        { text: "batch를 변경 및 통합", link: "third-challenge" },
        { text: "express에서 fatify 변경", link: "fourth-challenge" },
      ],
    },
    {
      text: "NestJs에서 ORM Transaction에 관한 코드 반복",
      link: "nestjs-orm-transaction",
      items: [{ text: "@toss/nestjs-aop", link: "toss-aop" }],
    },
    {
      text: "다중 요청건에 대한 방어",
      link: "nestjs-request-limit",
    },
    {
      text: "Certified Kubernetes Administrator",
      link: "cka",
    },
  ],
};
