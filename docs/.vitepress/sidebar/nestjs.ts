export const nestjsIntroduction = {
  base: "/backend/nestjs/introduction/",
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
  base: "/backend/nestjs/preparation/",
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
      base: "/backend/nestjs/module/",
      text: "Module",
      link: "module",
    },
    {
      base: "/backend/nestjs/controller/",
      text: "Controller",
      link: "controller",
      collapsed: true,
      items: [
        {
          base: "/backend/nestjs/pipe/",
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
          base: "/backend/nestjs/swagger/",
          text: "Swagger",
          link: "swagger",
          collapsed: true,
          items: [
            { text: "Swagger Installation", link: "swagger-install" },
            { text: "Swagger Use", link: "swagger-use" },
          ],
        },
        {
          base: "/backend/nestjs/guard/",
          text: "Guard",
          link: "guard",
          collapsed: true,
          items: [
            { text: "Local Guard", link: "local-guard" },
            { text: "Jwt Guard", link: "jwt-guard" },
            { text: "Session Guard", link: "session-guard" },
            {
              text: "Roles Guard - RBAC",
              link: "roles-guard-rbac",
              collapsed: true,
            },
            {
              text: "Roles Guard - PoliciesGuard",
              link: "roles-policies-guard",
              collapsed: true,
            },
          ],
        },
        {
          text: "Custom Decorator",
          link: "custom-decorator",
        },
      ],
    },
    {
      base: "/backend/nestjs/provider/",
      text: "Provider",
      link: "provider",
    },
    {
      base: "/backend/nestjs/interceptor/",
      text: "Interceptor",
      link: "interceptor",
    },
    {
      base: "/backend/nestjs/exception-filter/",
      text: "Exception Filter",
      link: "exception-filter",
      collapsed: true,
      items: [{ text: "Exception Class", link: "exception-class" }],
    },
    {
      base: "/backend/nestjs/middleware/",
      text: "Middleware",
      link: "middleware",
    },
    {
      base: "/backend/nestjs/database/",
      text: "Database",
      collapsed: true,
      items: [
        { text: "TypeORM", link: "typeorm" },
        {
          text: "TypeORM Relation",
          link: "typeorm-relation",
        },
        {
          text: "TypeORM MongoDB",
          link: "typeorm-mongodb",
        },
      ],
    },
  ],
};

export const nestjsTest = {
  base: "/backend/nestjs/test/",
  text: "Test",
  collapsed: true,
  items: [
    {
      text: "Unit Test",
      link: "unit-test",
      collapsed: true,
      items: [
        {
          text: "Jest",
          collapsed: true,
          items: [
            { text: "Getting Started", link: "jest-getting-started" },
            { text: "Expect", link: "expect" },
            { text: "Setup and Teardown", link: "setup-teardown" },
            { text: "Mock", link: "mock" },
          ],
        },
      ],
    },
  ],
};

export const nestjsApplied = {
  text: "Applied",
  collapsed: true,
  base: "/backend/nestjs/applied/",
  items: [
    {
      text: "Commander",
      link: "commander",
    },
    {
      text: "Fastify",
      link: "fastify",
    },
    {
      text: "RxJS",
      link: "rxjs",
    },
  ],
};

export const nestjsFundamentals = {
  base: "/backend/nestjs/fundamentals/",
  text: "Fundamentals",
  collapsed: true,
  items: [
    {
      text: "Custom providers",
      link: "custom-providers",
    },
    {
      text: "Dynamic modules",
      link: "dynamic-modules",
    },
    {
      text: "Injection Scope",
      link: "injection-scope",
    },
    {
      text: "Circular dependency",
      link: "circular-dependency",
    },
    {
      text: "Module reference",
      link: "module-reference",
    },
    {
      text: "Lazy loading modules",
      link: "lazy-loading-modules",
    },
    {
      text: "Lifecycle Events",
      link: "lifecycle-events",
    },
    {
      text: "Excution Context",
      link: "excution-context",
    },
    {
      text: "Lifecycle Events",
      link: "lifecycle-events",
    },
    {
      text: "Testing",
      link: "testing",
    },
  ],
};

export const nestjsTechniques = {
  base: "/backend/nestjs/techniques/",
  text: "Techniques",
  collapsed: true,
  items: [
    {
      text: "Configuration",
      link: "configuration",
    },
    {
      text: "Caching",
      link: "caching",
    },
    {
      text: "Task Scheduling",
      link: "task-scheduling",
    },
    {
      text: "Queue",
      link: "queue",
    },
    {
      text: "Cookies",
      link: "cookies",
    },
    {
      text: "Events",
      link: "events",
    },
    {
      text: "Compression",
      link: "compression",
    },
  ],
};
