import "reflect-metadata";
import { createConnection } from "typeorm";
import app from "./app";
import ormconfig from "../ormconfig";

console.log(JSON.stringify(ormconfig));

const port = process.env.PORT || 8080;
createConnection(ormconfig)
  .then(async (connection) => {
    app.listen(port, () => {
      console.log(`Server listening on ${port}`);
    });
  })
  .catch((error) => console.log(error));
