# Install CLI

## AWS CLI

## MAC

```sh
# Download Binary
curl "https://awscli.amazonaws.com/AWSCLIV2.pkg" -o "AWSCLIV2.pkg"

# Install the binary
sudo installer -pkg ./AWSCLIV2.pkg -target /
```

### IAM

IAM > 사용자 > 사용자 생성 > 정책연결 > cli로 access key 생성

연결이 필요한 정책

- AmazonEKSClusterPolicy
- AmazonEKSServicePolicy
- AmazonEKSWorkerNodePolicy
- AmazonVPCFullAccess
- AWSCloudFormationFullAccess
- ElasticLoadBalancingFullAccess
- AmazonEC2FullAccess
- IAMFullAccess

```sh
aws configure
AWS Access Key ID [None]:
AWS Secret Access Key [None]:
Default region name [None]: ap-northeast-2
Default output format [None]: json

## 확인
aws ec2 describe-vpcs
```

### reference

https://docs.aws.amazon.com/cli/latest/userguide/cli-chap-install.html<br/>
https://docs.aws.amazon.com/cli/latest/userguide/install-cliv2.html

## kubectl CLI

### MAC

```sh
curl -O https://s3.us-west-2.amazonaws.com/amazon-eks/1.30.0/2024-05-12/bin/darwin/amd64/kubectl
chmod +x ./kubectl
mkdir -p $HOME/bin && cp ./kubectl $HOME/bin/kubectl && export PATH=$HOME/bin:$PATH
echo 'export PATH=$HOME/bin:$PATH' >> ~/.zshrc
source ~/.zshrc
kubectl version --client
```

### reference

https://docs.aws.amazon.com/eks/latest/userguide/install-kubectl.html

## eksctl CLI

### MAC

```sh
# brew가 없다면
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install.sh)"

brew tap weaveworks/tap
brew install weaveworks/tap/eksctl
eksctl version
```

### reference

https://docs.aws.amazon.com/ko_kr/emr/latest/EMR-on-EKS-DevelopmentGuide/setting-up-eksctl.html  
https://eksctl.io/installation/
