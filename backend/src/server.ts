import "reflect-metadata";
import { createConnection } from "typeorm";
import app from "./app";

const port = process.env.PORT || 8080;
createConnection()
  .then(async (connection) => {
    app.listen(port, () => {
      console.log(`Server listening on ${port}`);
    });
  })
  .catch((error) => console.log(error));
