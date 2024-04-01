export const kuberIntroduction = {
  base: "/devops/kubernetes/certification/",
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
        {
          text: "Tips",
          link: "tips",
        },
      ],
    },
  ],
};

export const kuberConcepts = {
  base: "/devops/kubernetes/core-concepts/",
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
    {
      text: "Deployment",
      link: "deployment",
      collapsed: true,
      items: [
        {
          text: "Practice - Deployment",
          link: "deployment-practice",
        },
      ],
    },
    {
      text: "Service",
      link: "service",
      collapsed: true,
      items: [
        {
          text: "nodePort",
          link: "nodeport",
        },
        {
          text: "ClusterIP",
          link: "clusterip",
        },
        {
          text: "LoadBalancer",
          link: "loadbalancer",
        },
        {
          text: "Practice - Service",
          link: "service-practice",
        },
      ],
    },
    {
      text: "Namespace",
      link: "namespace",
      collapsed: true,
      items: [
        {
          text: "Practice - Namespace",
          link: "namespace-practice",
        },
      ],
    },
    {
      text: "Imperative vs Declarative",
      link: "imperative-vs-declarative",
    },
  ],
};

export const kuberScheduling = {
  base: "/devops/kubernetes/scheduling/",
  text: "Scheduling",
  collapsed: true,
  items: [
    { text: "Manual Scheduling", link: "manual-scheduling" },
    { text: "Labels and Selectors", link: "labels-and-selectors" },
    { text: "Taints and Tolerations", link: "taints-and-tolerations" },
  ],
};
