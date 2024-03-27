export const nestjsIntroduction = {
  base: "/backend/nestjs/",
  text: "Introduction",
  collapsed: true,
  items: [
    {
      text: "Introduction",
      link: "introduction",
    },
    {
      text: "Quick Start",
      link: "quick-start",
    },
  ],
};

export const nestjsPreparation = {
  base: "/backend/nestjs/",
  text: "Preparation",
  collapsed: true,
  items: [
    {
      text: "Lifecycle",
      link: "lifecycle",
    },
    {
      text: "CLI",
      link: "first-cli",
    },
    {
      text: "SWC",
      link: "standard-swc",
    },
    {
      text: "VsCode Extension",
      link: "vs-extention",
    },
    {
      text: "main.ts",
      link: "main-ts",
      items: [
        {
          text: "Cors",
          link: "cors",
        },
        {
          text: "Helmet",
          link: "helmet",
        },
        {
          text: "Session",
          link: "session",
        },
        {
          text: "Prefix",
          link: "prefix",
        },
      ],
    },
  ],
};

export const nestjsBasic = {
  base: "/backend/nestjs/",
  text: "Basic",
  collapsed: true,
  items: [
    {
      text: "Module",
      link: "module",
    },
    {
      text: "Controller",
      link: "controller",
      items: [
        {
          text: "Pipe",
          link: "pipe",
        },
        {
          text: "Swagger",
          link: "swagger",
          items: [
            { text: "Swagger Installation", link: "swagger-install" },
            { text: "Swagger Use", link: "swagger-use" },
          ],
        },
        {
          text: "Guard",
          link: "guard",
        },
        {
          text: "Custom Decorator",
          link: "custom-decorator",
        },
      ],
    },
    {
      text: "Provider",
      link: "Provider",
    },
    {
      text: "Interceptor",
      link: "interceptor",
    },
    {
      text: "Exception Filter",
      link: "dxception-filter",
    },
    {
      text: "Middleware",
      link: "middleware",
    },
  ],
};
