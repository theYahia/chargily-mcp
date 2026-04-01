import { z } from "zod";
import { ChargilyClient } from "../client.js";

const client = new ChargilyClient();

export const create_productSchema = z.object({
  name: z.string().describe("Product name"),
  description: z.string().optional().describe("Description"),
});

export async function handleCreateProduct(params: z.infer<typeof create_productSchema>): Promise<string> {
  const result = await client.request("POST", "/products", params);
  return JSON.stringify(result, null, 2);
}
