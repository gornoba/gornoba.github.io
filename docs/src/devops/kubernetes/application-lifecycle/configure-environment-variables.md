# Configure Environment Variables In Applications

## cli 명령어

```sh
docker run -e APP_COLOR=pink simple-webapp-color
```

## yaml 파일

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: simple-webapp-color
spec:
  containers:
    - name: simple-webapp-color
      image: simple-webapp-color
      ports:
        - containerPort: 8080
      env:
        - name: APP_COLOR
          value: pink
```

## K8s Reference Docs

https://kubernetes.io/docs/tasks/inject-data-application/define-environment-variable-container/
