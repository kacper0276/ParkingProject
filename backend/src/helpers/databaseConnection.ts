import { createConnection, Connection } from "mysql2";

const connection: Connection = createConnection({
  host: "localhost",
  user: "root",
  database: "shop",
  multipleStatements: true,
});

export default connection;
