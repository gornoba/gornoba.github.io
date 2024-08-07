import { defineConfig } from "vitepress";
import {
  kubeDesignInstall,
  kubeInstallKubeadmWay,
  kubeNetworking,
  kubeStorage,
  kubeTroubleshooting,
  kuberApplicationLifecycle,
  kuberClusterMaintenance,
  kuberConcepts,
  kuberIntroduction,
  kuberLoggingAndMonitoring,
  kuberScheduling,
  kuberSecurity,
} from "./sidebar/kubernetes";
import {
  vitepressCustom,
  vitepressExpose,
  vitepressIntroduction,
  vitepressWrite,
} from "./sidebar/vitepress";
import {
  nestjsIntroduction,
  nestjsPreparation,
  nestjsBasic,
  nestjsTest,
  nestjsApplied,
  nestjsFundamentals,
  nestjsTechniques,
  nestjsEtc,
} from "./sidebar/nestjs";
import { whoamiCompany, whoamiInto } from "./sidebar/whoami";
import {
  awsCodepipeline,
  awsEc2,
  awsEcr,
  awsEks,
  awsIam,
  awsRds,
  awsRoute53,
  awsVpc,
} from "./sidebar/aws";
import { gcpNetworkService } from "./sidebar/gcp";
import { postgresBackup } from "./sidebar/postgres";
import { dockerStart } from "./sidebar/docker";
import { winyearend } from "./sidebar/project";
import {
  vueBuiltInComponent,
  vueComponents,
  vueEssentials,
  vueLibraries,
  vueReusability,
  vueStart,
} from "./sidebar/vue";
import {
  quasarLayoutAndGrid,
  quasarOptionHelper,
  quasarPlugin,
  quasarUtils,
  quasarVueComponents,
  quasarVueDirectives,
  quasrStyleIdentity,
} from "./sidebar/quasar";
import { redash } from "./sidebar/redash";
import {
  dart,
  flutterNavigator,
  flutterSetting,
  flutterState,
  flutterWidget,
} from "./sidebar/flutter";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Hyunhoo's blog",
  description: "A VitePress Site",
  cleanUrls: true,
  srcDir: "src",
  base: "/",
  head: [["link", { rel: "icon", href: "/favicon.ico" }]],
  vite: {
    build: {
      chunkSizeWarningLimit: 1000,
    },
  },
  sitemap: {
    hostname: "https://gornoba.github.io/",
  },
  markdown: {
    image: {
      lazyLoading: true,
    },
  },
  lastUpdated: true,
  themeConfig: {
    search: {
      provider: "local",
    },
    nav: [
      { text: "Home", link: "/" },
      {
        text: "Frontend",
        items: [
          {
            text: "Vue",
            link: "/frontend/vue/",
          },
          {
            text: "Quasar",
            link: "/frontend/quasar/start",
          },
          {
            text: "VitePress",
            link: "/frontend/vitepress/",
          },
        ],
      },
      {
        text: "Backend",
        items: [
          {
            text: "NestJs",
            link: "/backend/nestjs/introduction/introduction",
          },
        ],
      },
      {
        text: "DevOps",
        items: [
          {
            text: "Kubernetes",
            link: "/devops/kubernetes/core-concepts/cluster-architecture",
          },
        ],
      },
      {
        text: "Cloud",
        items: [
          {
            text: "AWS",
            link: "/aws/",
          },
          {
            text: "GCP",
            link: "/gcp/",
          },
        ],
      },
    ],

    sidebar: [
      {
        text: "Who am I?",
        base: "/whoiam/",
        items: [whoamiInto, whoamiCompany],
      },
      {
        text: "개인 프로젝트",
        base: "/project/",
        items: [winyearend],
      },
      {
        text: "Frontend",
        items: [
          {
            base: "/frontend/vue/",
            text: "Vue",
            link: "/",
            collapsed: true,
            items: [
              vueStart,
              vueEssentials,
              vueComponents,
              vueReusability,
              vueBuiltInComponent,
              vueLibraries,
            ],
          },
          {
            text: "Quasar",
            collapsed: true,
            items: [
              {
                text: "시작하기",
                link: "/frontend/quasar/start",
              },
              quasarOptionHelper,
              quasrStyleIdentity,
              quasarLayoutAndGrid,
              quasarVueComponents,
              quasarVueDirectives,
              quasarPlugin,
              quasarUtils,
            ],
          },
          {
            text: "VitePress",
            collapsed: true,
            items: [
              vitepressIntroduction,
              vitepressWrite,
              vitepressCustom,
              vitepressExpose,
            ],
          },
          {
            text: "Flutter",
            collapsed: true,
            items: [
              dart,
              flutterSetting,
              flutterWidget,
              flutterState,
              flutterNavigator,
            ],
          },
        ],
      },
      {
        text: "Backend",
        items: [
          {
            text: "NestJs",
            collapsed: true,
            items: [
              nestjsIntroduction,
              nestjsPreparation,
              nestjsBasic,
              nestjsFundamentals,
              nestjsTechniques,
              nestjsTest,
              nestjsApplied,
              nestjsEtc,
            ],
          },
        ],
      },
      {
        text: "DevOps",
        items: [
          {
            text: "Kubernetes",
            collapsed: true,
            items: [
              kuberIntroduction,
              kuberConcepts,
              kuberScheduling,
              kuberLoggingAndMonitoring,
              kuberApplicationLifecycle,
              kuberClusterMaintenance,
              kuberSecurity,
              kubeStorage,
              kubeNetworking,
              kubeDesignInstall,
              kubeInstallKubeadmWay,
              kubeTroubleshooting,
            ],
          },
          {
            text: "Docker",
            collapsed: true,
            items: [dockerStart],
          },
          {
            text: "redash",
            base: "/redash/",
            collapsed: true,
            items: redash,
          },
        ],
      },
      {
        text: "Cloud",
        items: [
          {
            base: "/aws",
            text: "AWS",
            link: "/",
            collapsed: true,
            items: [
              awsEks,
              awsEcr,
              awsIam,
              awsEc2,
              awsRds,
              awsVpc,
              awsCodepipeline,
              awsRoute53,
            ],
          },
          {
            base: "/gcp",
            text: "GCP",
            link: "/",
            collapsed: true,
            items: [gcpNetworkService],
          },
        ],
      },
      {
        text: "Database",
        items: [
          {
            text: "PostgreSQL",
            collapsed: true,
            items: [postgresBackup],
          },
        ],
      },
    ],

    socialLinks: [{ icon: "github", link: "https://github.com/gornoba" }],
  },
});
