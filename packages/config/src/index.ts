import 'dotenv/config';
import * as z from 'zod';

const configSchema = z.object({
   DATABASE_URL: z.string().url()
});

export type configDto = z.infer<typeof configSchema>;

export const config: configDto = configSchema.parse(process.env);