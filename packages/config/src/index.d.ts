import * as z from "zod";
declare const configSchema: z.ZodObject<{
    DATABASE_URL: z.ZodString;
    API_PORT: z.ZodDefault<z.ZodCoercedNumber<unknown>>;
}, z.core.$strip>;
export type configDto = z.infer<typeof configSchema>;
export declare const config: configDto;
export {};
//# sourceMappingURL=index.d.ts.map