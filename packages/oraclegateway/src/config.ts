// import oracledb from "oracledb";

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
  ORACLE_USER: "scott",
  ORACLE_PWD: "tiger",
  ORACLE_CONNECTSTRING: "localhost:1521/XEPDB1",
  ORACLE_LIBDIR: "/Users/tanjimhossain/Downloads/instantclient_19_8",
  DB_POOL_MIN: "1",
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
  DB_POOL_MIN,
} = env;

const config = {
  isDev,
  NODE_ENV,
  PORT,
  cors: {
    whitelist: CORS_WHITELIST,
  },
  oracledb: {
    clientConfig: {
      libDir: ORACLE_LIBDIR,
    },
    poolConfig: {
      connectString: ORACLE_CONNECTSTRING,
      user: ORACLE_USER,
      password: ORACLE_PWD,
      poolMin: parseInt(DB_POOL_MIN, 10),
    },
  },
};

export default config;
