import { z } from "zod";
import { ChargilyClient } from "../client.js";

const client = new ChargilyClient();

export const list_productsSchema = z.object({
  page: z.number().default(1).describe("Page"),
  limit: z.number().default(25).describe("Limit"),
});

export async function handleListProducts(params: z.infer<typeof list_productsSchema>): Promise<string> {
  const qs = new URLSearchParams();
  if (params.page) qs.set("page", String(params.page));
  if (params.limit) qs.set("limit", String(params.limit));

  const result = await client.request("GET", `/products?${qs}`);
  return JSON.stringify(result, null, 2);
}
