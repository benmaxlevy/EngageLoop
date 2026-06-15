import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "./generated/prisma/client.js";
import { config } from "@repo/config";
const adapter = new PrismaPg({ config, : .DATABASE_URL });
export const prisma = new PrismaClient({ adapter });
