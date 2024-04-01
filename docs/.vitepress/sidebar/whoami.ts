export const whoamiInto = {
  base: "/whoiam/intro/",
  text: "소개글",
  link: "introduction",
  collapsed: true,
};

export const whoamiCompany = {
  text: "개발생활",
  base: "/whoiam/company/gcp-to-aws/",
  collapsed: true,
  items: [
    {
      text: "GCP에서 AWS로 서비스 이전",
      link: "gcp-to-aws",
      collapsed: true,
      items: [
        { text: "CI/CD를 AWS로 변경", link: "first-challenge" },
        { text: "EC2에서 무중단배포 구현", link: "second-challenge" },
        { text: "batch를 변경 및 통합", link: "third-challenge" },
        { text: "express에서 fatify 변경", link: "fourth-challenge" },
      ],
    },
  ],
};
