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
    { text: "Node Selectors", link: "node-selectors" },
    { text: "Node Affinity", link: "node-affinity" },
    {
      text: "Taints and Tolerations vs Node Affinity",
      link: "taints-and-tolerations-vs-node-affinity",
    },
    {
      text: "Resource Requirements and Limits",
      link: "resource-requirements-and-limits",
    },
    {
      text: "Editing Pods and Deployments",
      link: "editing-pods-and-deployments",
    },
    {
      text: "DemonSet",
      link: "daemonset",
    },
    {
      text: "Static Pods",
      link: "static-pods",
    },
    {
      text: "Multiple Schedulers",
      link: "multiple-schedulers",
    },
    {
      text: "Configuring Kubernetes Schedulers",
      link: "configuring-kubernetes-schedulers",
    },
  ],
};

export const kuberLoggingAndMonitoring = {
  base: "/devops/kubernetes/logging-and-monitoring/",
  text: "Logging and Monitoring",
  collapsed: true,
  items: [
    {
      text: "Monitor Cluster Components",
      link: "monitor-cluster-components",
    },
    {
      text: "Managing Application Logs",
      link: "managing-application-logs",
    },
  ],
};

export const kuberApplicationLifecycle = {
  base: "/devops/kubernetes/application-lifecycle/",
  text: "Application Lifecycle",
  collapsed: true,
  items: [
    {
      text: "Rolling Updates and Rollbacks",
      link: "rolling-updates-and-rollbacks",
    },
    { text: "Commands", link: "commands" },
    { text: "Commands and Arguments", link: "commands-and-arguments" },
    {
      text: "Configure Environment Variables in Applications",
      link: "configure-environment-variables",
    },
    {
      text: "Configuer ConfigMaps in Applications",
      link: "configure-configmaps",
    },
    { text: "Configure Secrets in Applications", link: "configure-secrets" },
    {
      text: "Encrypting Secrets Data at Rest",
      link: "encrypting-secrets-data-at-rest",
    },
    { text: "Multi Container Pods", link: "multi-container-pods" },
    { text: "Init Containers", link: "init-containers" },
  ],
};

export const kuberClusterMaintenance = {
  base: "/devops/kubernetes/cluster-maintenance/",
  text: "Cluster Maintenance",
  collapsed: true,
  items: [
    { text: "OS Upgrades", link: "os-upgrades" },
    {
      text: "Kubernetes Software Versions",
      link: "kubernetes-software-versions",
    },
    { text: "Cluster Upgrede Process", link: "cluster-upgrade-process" },
    { text: "Backup and Restore Methods", link: "backup-and-restore-methods" },
  ],
};

export const kuberSecurity = {
  base: "/devops/kubernetes/security/",
  text: "Security",
  collapsed: true,
  items: [
    {
      text: "Kubernetes Security Primitives",
      link: "kubernetes-security-primitives",
    },
    { text: "Authentication", link: "authentication" },
    { text: "TLS Basics", link: "tls-basics" },
    { text: "TLS in Kubernetes", link: "tls-in-kubernetes" },
    {
      text: "TLS in Kubernetes - Certificate Creation",
      link: "tls-in-kubernetes-certificate-creation",
    },
    { text: "View Certificate Details", link: "view-certificate-details" },
    { text: "Certificate API", link: "certificate-api" },
    { text: "Kubeconfig", link: "kubeconfig" },
    { text: "API Groups", link: "api-groups" },
    { text: "Authorization", link: "authorization" },
    { text: "Role Based Access Control", link: "role-based-access-control" },
    {
      text: "Cluster Roles and Role Bindings",
      link: "cluster-roles-and-role-bindings",
    },
    { text: "Service Accounts", link: "service-accounts" },
    { text: "Image Security", link: "image-security" },
    { text: "Pre-requisite - Security in Docker", link: "security-in-docker" },
    { text: "Security Contexts", link: "security-contexts" },
    { text: "Network Policy", link: "network-policy" },
    {
      text: "Developing network policies",
      link: "developing-network-policies",
    },
    {
      text: "Kubectx and Kubens",
      link: "kubectx-and-kubens",
    },
  ],
};

export const kubeStorage = {
  base: "/devops/kubernetes/storage/",
  text: "Storage",
  collapsed: true,
  items: [
    { text: "Storage in Docker", link: "storage-in-docker" },
    {
      text: "Volume Driver Plugins in Docker",
      link: "volume-driver-plugins-in-docker",
    },
    {
      text: "Container Storage Interface",
      link: "container-storage-interface",
    },
    { text: "Volumes", link: "volumes" },
    { text: "Persistent Volumes", link: "persistent-volumes" },
    { text: "Persistent Volume Claims", link: "persistent-volume-claims" },
    { text: "Storage Class", link: "storage-class" },
  ],
};

export const kubeNetworking = {
  base: "/devops/kubernetes/networking/",
  text: "Networking",
  collapsed: true,
  items: [
    {
      text: "Prerequsite",
      collapsed: true,
      items: [
        {
          text: "Switching Routing",
          link: "switching-routing",
        },
        {
          text: "DNS",
          link: "dns",
        },
        {
          text: "CoreDNS",
          link: "coredns",
        },
        {
          text: "Network Namespaces",
          link: "network-namespaces",
        },
        {
          text: "Docker Networking",
          link: "docker-networking",
        },
        {
          text: "CNI",
          link: "cni",
        },
        {
          text: "Cluster Networking",
          link: "cluster-networking",
        },
        {
          text: "Prerequsite - Practice",
          link: "prerequsite-practice",
        },
      ],
    },
    {
      text: "Pod Networking",
      link: "pod-networking",
    },
    {
      text: "CNI in kubernetes",
      link: "cni-in-kubernetes",
    },
    {
      text: "CNI weave",
      link: "cni-weave",
    },
  ],
};
