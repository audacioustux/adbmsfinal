import oracledb from "oracledb";
import config from "./config";
import Debug from "debug";

const debug = Debug("db");

const {
  oracledb: { clientConfig, poolConfig },
} = config;

oracledb.initOracleClient(clientConfig);

const pool = oracledb.createPool(poolConfig).then((pool) => {
  debug("database connection pool created");
  return pool;
});

process.once("beforeExit", async () => {
  await oracledb.getPool().close();
});

export { pool };
