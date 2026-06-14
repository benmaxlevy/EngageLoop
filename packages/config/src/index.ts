import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import * as z from 'zod';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, '../../../.env') });

const configSchema = z.object({
  DATABASE_URL: z.string().url()
});

export type configDto = z.infer<typeof configSchema>;

export const config: configDto = configSchema.parse(process.env);