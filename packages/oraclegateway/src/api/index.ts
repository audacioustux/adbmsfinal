import oracledb, { Connection } from "oracledb";
import { Router } from "express";
import Debug from "debug";

const debug = Debug("api");

const router = Router();

router.post("/query", async (req, res) => {
  const { sql, binds = [] } = req.body;
  let connection: Connection;
  try {
    connection = await oracledb.getConnection();
    const options = { outFormat: oracledb.OUT_FORMAT_OBJECT };
    const result = await connection.execute(sql, binds, options);
    res.send(result);
  } catch (err) {
    res.statusCode = 500;
    res.json({ err });
  } finally {
    if (connection) {
      try {
        await connection.close();
      } catch (err) {
        debug(err);
      }
    }
  }
});

export default router;
