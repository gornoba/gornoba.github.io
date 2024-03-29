# 정책

`IAM - 정책 - 정책생성`
![](2024-03-29-16-27-31.png)

## Code Deploy를 위한 권한 목록

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": [
        "autoscaling:*",
        "codedeploy:*",
        "ec2:*",
        "lambda:*",
        "elasticloadbalancing:*",
        "s3:*",
        "cloudwatch:*",
        "logs:*",
        "sns:*"
      ],
      "Resource": "*"
    }
  ]
}
```
