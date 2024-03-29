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
      text: "Code Deploy",
      base: "/aws/code-pipeline/code-deploy/",
      collapsed: true,
      items: [{ text: "CodeDeploy Agent", link: "codedeploy-agent" }],
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
      items: [{ text: "Role", link: "role" }],
    },
  ],
};
