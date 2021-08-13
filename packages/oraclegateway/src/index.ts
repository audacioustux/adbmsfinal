import { pool } from "./db";

async function init() {
  await pool;
  import("./server");
}

init();
