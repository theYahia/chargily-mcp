#!/usr/bin/env node

import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { create_checkoutSchema, handleCreateCheckout } from "./tools/create-checkout.js";
import { get_checkoutSchema, handleGetCheckout } from "./tools/get-checkout.js";
import { list_checkoutsSchema, handleListCheckouts } from "./tools/list-checkouts.js";
import { create_customerSchema, handleCreateCustomer } from "./tools/create-customer.js";
import { list_customersSchema, handleListCustomers } from "./tools/list-customers.js";
import { create_productSchema, handleCreateProduct } from "./tools/create-product.js";
import { list_productsSchema, handleListProducts } from "./tools/list-products.js";
import { create_priceSchema, handleCreatePrice } from "./tools/create-price.js";

const server = new McpServer({ name: "chargily-mcp", version: "1.0.0" });

server.tool("create_checkout", "Create a checkout session", create_checkoutSchema.shape,
  async (params) => ({ content: [{ type: "text", text: await handleCreateCheckout(params) }] }));
server.tool("get_checkout", "Get checkout status", get_checkoutSchema.shape,
  async (params) => ({ content: [{ type: "text", text: await handleGetCheckout(params) }] }));
server.tool("list_checkouts", "List checkouts", list_checkoutsSchema.shape,
  async (params) => ({ content: [{ type: "text", text: await handleListCheckouts(params) }] }));
server.tool("create_customer", "Create a customer", create_customerSchema.shape,
  async (params) => ({ content: [{ type: "text", text: await handleCreateCustomer(params) }] }));
server.tool("list_customers", "List customers", list_customersSchema.shape,
  async (params) => ({ content: [{ type: "text", text: await handleListCustomers(params) }] }));
server.tool("create_product", "Create a product", create_productSchema.shape,
  async (params) => ({ content: [{ type: "text", text: await handleCreateProduct(params) }] }));
server.tool("list_products", "List products", list_productsSchema.shape,
  async (params) => ({ content: [{ type: "text", text: await handleListProducts(params) }] }));
server.tool("create_price", "Create a price for a product", create_priceSchema.shape,
  async (params) => ({ content: [{ type: "text", text: await handleCreatePrice(params) }] }));

async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error("[chargily-mcp] Server started. 8 tools available.");
}

main().catch((error) => { console.error("[chargily-mcp] Error:", error); process.exit(1); });
