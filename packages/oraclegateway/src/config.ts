const { NODE_ENV = "production" } = process.env;

const isDev = NODE_ENV === "development";

// safe for all environment
const safeDefs: NodeJS.ProcessEnv = {
  PORT: "4000",
};

// safe defaults for production environment
const prodDefs: NodeJS.ProcessEnv = { ...safeDefs };

// safe defaults for development environment
const devDefs: NodeJS.ProcessEnv = {
  ...safeDefs,
  CORS_WHITELIST: "*",
  ORACLE_USER: "sys",
  ORACLE_PWD: "Oracle_18",
  ORACLE_CONNECTSTRING: "localhost/XE",
  ORACLE_LIBDIR: "/Users/tanjimhossain/Downloads/instantclient_19_8",
};

const env = new Proxy(process.env, {
  get: (env, key: string): string => {
    const value = env[key];
    const devValue = devDefs[key];
    const prodValue = prodDefs[key];
    if (value) return value;
    if (isDev && devValue) return devValue;
    if (!isDev && prodValue) return prodValue;

    throw new Error(`Environment Variable '${key}' is missing!`);
  },
}) as Record<string, string>;

const {
  PORT,
  CORS_WHITELIST,
  ORACLE_CONNECTSTRING,
  ORACLE_PWD,
  ORACLE_USER,
  ORACLE_LIBDIR,
} = env;

const config = {
  isDev,
  NODE_ENV,
  PORT,
  cors: {
    whitelist: CORS_WHITELIST.split(","),
  },
  oracledb: {
    clientConfig: {
      libDir: ORACLE_LIBDIR,
    },
    connectionConfig: {
      createString: ORACLE_CONNECTSTRING,
      user: ORACLE_USER,
      password: ORACLE_PWD,
    },
  },
};

export default config;
