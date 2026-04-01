import { z } from "zod";
import { ChargilyClient } from "../client.js";

const client = new ChargilyClient();

export const create_checkoutSchema = z.object({
  amount: z.number().describe("Amount in DZD"),
  currency: z.string().default("dzd").describe("Currency"),
  success_url: z.string().describe("Success redirect URL"),
  description: z.string().optional().describe("Description"),
});

export async function handleCreateCheckout(params: z.infer<typeof create_checkoutSchema>): Promise<string> {
  const result = await client.request("POST", "/checkouts", params);
  return JSON.stringify(result, null, 2);
}
