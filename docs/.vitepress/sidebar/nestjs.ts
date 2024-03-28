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
        {
          text: "Cookie Parser",
          link: "cookie-parser",
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
      collapsed: true,
      items: [
        {
          text: "Pipe",
          link: "pipe",
          collapsed: true,
          items: [
            {
              text: "Class Validator",
              link: "class-validator",
            },
            {
              text: "Class Transformer",
              link: "class-transformer",
            },
          ],
        },
        {
          text: "Swagger",
          link: "swagger",
          collapsed: true,
          items: [
            { text: "Swagger Installation", link: "swagger-install" },
            { text: "Swagger Use", link: "swagger-use" },
          ],
        },
        {
          text: "Guard",
          link: "guard",
          collapsed: true,
          items: [
            { text: "Local Guard", link: "local-guard" },
            { text: "Jwt Guard", link: "jwt-guard" },
            { text: "Roles Guard", link: "roles-guard" },
          ],
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
      collapsed: true,
      items: [{ text: "Exception Class", link: "exception-class" }],
    },
    {
      text: "Middleware",
      link: "middleware",
    },
  ],
};
