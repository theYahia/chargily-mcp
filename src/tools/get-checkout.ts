import { z } from "zod";
import { ChargilyClient } from "../client.js";

const client = new ChargilyClient();

export const get_checkoutSchema = z.object({
  checkout_id: z.string().describe("Checkout ID"),
});

export async function handleGetCheckout(params: z.infer<typeof get_checkoutSchema>): Promise<string> {
  const result = await client.request("GET", `/checkouts/${params.checkout_id}`);
  return JSON.stringify(result, null, 2);
}
