import oracledb from "oracledb";
import config from "./config";

const {
  oracledb: { clientConfig, connectionConfig },
} = config;

oracledb.initOracleClient(clientConfig);

oracledb.createPool(connectionConfig);

process.once("beforeExit", async () => {
  await oracledb.getPool().close();
});
