import * as z from "zod";

export const schemaLogin = z.object({
  email: z.string().email("Bitte gib eine gültige E-Mail-Adresse ein."),
  password: z.string().min(8, "Mindestlänge 8 Zeichen"),
});

export const schemaPass = z.object({
  email: z.string().email("Bitte gib eine gültige E-Mail-Adresse ein.")
})
