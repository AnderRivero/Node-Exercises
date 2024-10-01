import { PrismaClient } from "@prisma/client";
import { evns } from "./config/plugins/envs.plugins";
import { MongoDatabase } from "./data/mongo/";
import { Server } from "./presentation/server";

(async () => main())();
async function main() {
  await MongoDatabase.connect({
    mongoUrl: evns.MONGO_URL,
    dbName: evns.MONGO_DB_NAME,
  });

  Server.start();
}
