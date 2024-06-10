export const awsEc2 = {
  text: "EC2",
  base: "/aws/ec2/",
  link: "ec2",
  collapsed: true,
  items: [
    {
      text: "Instance",
      base: "/aws/ec2/instance/",
      collapsed: true,
      items: [
        { text: "EC2 Instance 생성", link: "create-instance" },
        { text: "EC2 Setting", link: "ec2-setting" },
      ],
    },
    {
      text: "Network & Security",
      base: "/aws/ec2/networkNsecurity/",
      collapsed: true,
      items: [
        { text: "Security Group", link: "create-security-group" },
        { text: "탄력적 IP", link: "elastic-ip-addresses" },
      ],
    },
    {
      text: "로드 밸런싱",
      base: "/aws/ec2/loadBalancing/",
      link: "/",
      collapsed: true,
      items: [
        { text: "로드 밸런서", link: "load-balancer" },
        { text: "대상 그룹", link: "target-group" },
      ],
    },
  ],
};

export const awsVpc = {
  text: "VPC",
  base: "/aws/vpc/",
  link: "vpc",
  collapsed: true,
  items: [
    {
      text: "Virtual Private Cloud",
      base: "/aws/vpc/virtual-private-cloud/",
      collapsed: true,
      items: [{ text: "Create VPC", link: "create-vpc" }],
    },
  ],
};

export const awsCodepipeline = {
  text: "Code Pipeline",
  base: "/aws/code-pipeline/",
  collapsed: true,
  items: [
    {
      text: "Code Build",
      base: "/aws/code-pipeline/code-build/",
      collapsed: true,
      items: [
        { text: "환경변수", link: "env" },
        { text: "buildspec.yml", link: "buildspec" },
        { text: "CodeBuild Create", link: "build-create" },
      ],
    },
    {
      text: "Code Deploy",
      base: "/aws/code-pipeline/code-deploy/",
      collapsed: true,
      items: [
        { text: "CodeDeploy Agent", link: "codedeploy-agent" },
        { text: "appspec.yml", link: "appspec" },
        { text: "CodeDeploy Create", link: "codedeploy-create" },
      ],
    },
  ],
};

export const awsIam = {
  text: "IAM",
  base: "/aws/iam/",
  collapsed: true,
  items: [
    {
      text: "Access Management",
      base: "/aws/iam/access-management/",
      collapsed: true,
      items: [
        { text: "사용자", link: "user" },
        { text: "역할", link: "role" },
        { text: "정책", link: "policy" },
      ],
    },
  ],
};

export const awsRoute53 = {
  text: "Route 53",
  base: "/aws/route53/",
  collapsed: true,
  items: [
    { text: "호스팅 영역", link: "hosting" },
    { text: "도메인 구입", link: "regist-domain" },
  ],
};

export const awsRds = {
  text: "RDS",
  base: "/aws/rds/",
  collapsed: true,
  items: [
    {
      text: "RDS 생성",
      link: "create-rds",
    },
  ],
};

export const awsEks = {
  text: "EKS",
  base: "/aws/eks/",
  collapsed: true,
  items: [
    {
      text: "EKS - Create Cluster using eksctl",
      base: "/aws/eks/create-cluster/",
      collapsed: true,
      items: [
        {
          text: "Install CLI",
          link: "install-cli",
        },
        {
          text: "EKS Cluster Introduction",
          link: "cluster-introduction",
        },
        {
          text: "Create EKS Cluster & Node Groups",
          link: "create-cluster",
        },
      ],
    },
    {
      text: "Kubernetes basics",
      link: "kubernetes-basics/",
    },
    {
      text: "Eks Storage",
      link: "aws-storage/",
    },
    {
      text: "Eks rds",
      link: "rds/",
    },
    {
      text: "Eks Load Balancer",
      base: "/aws/eks/load-balancer/",
      collapsed: true,
      items: [
        {
          text: "Classic and Network LoadBalancers",
          link: "classic-and-network-loadbalancers",
        },
      ],
    },
    {
      text: "Troubleshooting",
      base: "/aws/eks/troubleshooting/",
      collapsed: true,
      items: [
        {
          text: "m1에서 docker build 시",
          link: "docker-build-error",
        },
      ],
    },
  ],
};

export const awsEcr = {
  text: "ECR",
  base: "/aws/ecr/",
  collapsed: true,
  items: [
    {
      text: "Create Repository",
      link: "create-repository",
    },
  ],
};
