import { createConnection, Connection } from "mysql2";

const connection: Connection = createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: "parking",
  port: 3307,
  multipleStatements: true,
});

export default connection;
