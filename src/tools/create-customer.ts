import { z } from "zod";
import { ChargilyClient } from "../client.js";

const client = new ChargilyClient();

export const create_customerSchema = z.object({
  name: z.string().describe("Customer name"),
  email: z.string().describe("Email"),
  phone: z.string().optional().describe("Phone number"),
});

export async function handleCreateCustomer(params: z.infer<typeof create_customerSchema>): Promise<string> {
  const result = await client.request("POST", "/customers", params);
  return JSON.stringify(result, null, 2);
}
