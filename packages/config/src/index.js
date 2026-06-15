import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import * as z from "zod";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, "../../../.env") });
const configSchema = z.object({
    DATABASE_URL: z.string().url(),
    API_PORT: z.coerce.number().int().min(1).max(65535).default(8080),
});
export const config = configSchema.parse(process.env);
//# sourceMappingURL=index.js.map