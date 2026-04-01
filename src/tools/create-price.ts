import { z } from "zod";
import { ChargilyClient } from "../client.js";

const client = new ChargilyClient();

export const create_priceSchema = z.object({
  product_id: z.string().describe("Product ID"),
  amount: z.number().describe("Amount in DZD"),
  currency: z.string().default("dzd").describe("Currency"),
});

export async function handleCreatePrice(params: z.infer<typeof create_priceSchema>): Promise<string> {
  const result = await client.request("POST", "/prices", params);
  return JSON.stringify(result, null, 2);
}
