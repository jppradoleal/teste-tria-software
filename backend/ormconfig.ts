import { ConnectionOptions } from "typeorm";

export default {
   type: "postgres",
   host: process.env.DB_HOST,
   port: parseInt(process.env.DB_PORT),
   username: process.env.DB_USERNAME,
   password: process.env.DB_PASSWORD,
   database: process.env.DB_NAME,
   synchronize: true,
   logging: false,
   ssl: {
      rejectUnauthorized: false,
   },
   entities: [
      "src/entity/**/*.ts"
   ],
   migrations: [
      "src/migration/**/*.ts"
   ],
   subscribers: [
      "src/subscriber/**/*.ts"
   ],
   cli: {
      "entitiesDir": "src/entity",
      "migrationsDir": "src/migration",
      "subscribersDir": "src/subscriber"
   }
} as ConnectionOptions;