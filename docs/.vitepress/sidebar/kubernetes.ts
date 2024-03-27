export const kuberIntroduction = {
  base: "/devops/kubernetes/",
  text: "Introduction",
  collapsed: true,
  items: [
    {
      text: "Certification",
      link: "certification",
      items: [
        {
          text: "Certified Kubernetes Administrator",
          link: "certified-kubernetes-administrator",
        },
      ],
    },
  ],
};

export const kuberConcepts = {
  base: "/devops/kubernetes/",
  text: "Core Concepts",
  collapsed: true,
  items: [
    {
      text: "Cluster Architecture",
      link: "cluster-architecture",
    },
    {
      text: "Docker-vs-Containerd",
      link: "docker-vs-containerd",
    },
    {
      text: "ETCD",
      link: "etcd",
    },
    {
      text: "Kube-api server",
      link: "kube-api-server",
    },
    {
      text: "Kube Controller Manager",
      link: "kube-controller-manager",
    },
    {
      text: "Kube Scheduler",
      link: "kube-scheduler",
    },
    {
      text: "Kubelet",
      link: "kubelet",
    },
    {
      text: "Kube Proxy",
      link: "kube-proxy",
    },
    {
      text: "Pod",
      link: "pod",
      collapsed: true,
      items: [
        {
          text: "Pods with YAML",
          link: "pod-yaml",
        },
        {
          text: "Practice - Pods",
          link: "pod-yaml-demo",
        },
      ],
    },
    {
      text: "ReplicaSet",
      link: "replica-set",
      collapsed: true,
      items: [
        {
          text: "Practice - ReplicaSet",
          link: "replicaset-practice",
        },
      ],
    },
  ],
};
