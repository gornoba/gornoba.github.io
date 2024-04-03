import { defineConfig } from "vitepress";
import {
  kuberConcepts,
  kuberIntroduction,
  kuberScheduling,
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
} from "./sidebar/nestjs";
import { whoamiCompany, whoamiInto } from "./sidebar/whoami";
import {
  awsCodepipeline,
  awsEc2,
  awsIam,
  awsRds,
  awsRoute53,
  awsVpc,
} from "./sidebar/aws";
import { gcpNetworkService } from "./sidebar/gcp";
import { postgresBackup } from "./sidebar/postgres";
import { dockerStart } from "./sidebar/docker";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Hyunhoo's blog",
  description: "A VitePress Site",
  cleanUrls: true,
  srcDir: "src",
  base: "/",
  head: [["link", { rel: "icon", href: "/favicon.ico" }]],
  sitemap: {
    hostname: "https://gornoba.github.io/",
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
            link: "/backend/nestjs/introduction",
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
        text: "Frontend",
        items: [
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
              nestjsTest,
              nestjsApplied,
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
            items: [kuberIntroduction, kuberConcepts, kuberScheduling],
          },
          {
            text: "Docker",
            collapsed: true,
            items: [dockerStart],
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
