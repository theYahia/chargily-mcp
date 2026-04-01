import { describe, it, expect, vi, beforeEach } from "vitest";

const mockFetch = vi.fn();
global.fetch = mockFetch;

process.env.CHARGILY_SECRET_KEY = "test-key";

describe("chargily-mcp tools", () => {
  beforeEach(() => { vi.clearAllMocks(); vi.resetModules(); });

  it("create_checkout works", async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ id: "ck-1", checkout_url: "https://pay.chargily.com/test/ck-1", status: "pending" }),
      headers: new Map([["content-type", "application/json"]]),
    });
    const { handleCreateCheckout } = await import("../create-checkout.js");
    const result = await handleCreateCheckout({ amount: 5000, currency: "dzd", success_url: "https://example.com/success" });
    const parsed = JSON.parse(result);
    expect(parsed.checkout_url).toBeTruthy();
  });

  it("get_checkout works", async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ id: "ck-1", status: "paid", amount: 5000 }),
      headers: new Map([["content-type", "application/json"]]),
    });
    const { handleGetCheckout } = await import("../get-checkout.js");
    const result = await handleGetCheckout({ checkout_id: "ck-1" });
    const parsed = JSON.parse(result);
    expect(parsed.status).toBe("paid");
  });

  it("list_checkouts works", async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ data: [{ id: "ck-1" }] }),
      headers: new Map([["content-type", "application/json"]]),
    });
    const { handleListCheckouts } = await import("../list-checkouts.js");
    const result = await handleListCheckouts({ page: 1, limit: 25 });
    const parsed = JSON.parse(result);
    expect(parsed.data).toHaveLength(1);
  });

  it("create_customer works", async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ id: "cus-1", name: "Test", email: "t@t.com" }),
      headers: new Map([["content-type", "application/json"]]),
    });
    const { handleCreateCustomer } = await import("../create-customer.js");
    const result = await handleCreateCustomer({ name: "Test", email: "t@t.com" });
    const parsed = JSON.parse(result);
    expect(parsed.name).toBe("Test");
  });

  it("list_customers works", async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ data: [{ id: "cus-1" }] }),
      headers: new Map([["content-type", "application/json"]]),
    });
    const { handleListCustomers } = await import("../list-customers.js");
    const result = await handleListCustomers({ page: 1, limit: 25 });
    const parsed = JSON.parse(result);
    expect(parsed.data).toHaveLength(1);
  });

  it("create_product works", async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ id: "prod-1", name: "Widget" }),
      headers: new Map([["content-type", "application/json"]]),
    });
    const { handleCreateProduct } = await import("../create-product.js");
    const result = await handleCreateProduct({ name: "Widget" });
    const parsed = JSON.parse(result);
    expect(parsed.name).toBe("Widget");
  });

  it("list_products works", async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ data: [{ id: "prod-1" }] }),
      headers: new Map([["content-type", "application/json"]]),
    });
    const { handleListProducts } = await import("../list-products.js");
    const result = await handleListProducts({ page: 1, limit: 25 });
    const parsed = JSON.parse(result);
    expect(parsed.data).toHaveLength(1);
  });

  it("create_price works", async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ id: "price-1", amount: 1000, product_id: "prod-1" }),
      headers: new Map([["content-type", "application/json"]]),
    });
    const { handleCreatePrice } = await import("../create-price.js");
    const result = await handleCreatePrice({ product_id: "prod-1", amount: 1000, currency: "dzd" });
    const parsed = JSON.parse(result);
    expect(parsed.amount).toBe(1000);
  });

  it("handles HTTP errors", async () => {
    mockFetch.mockResolvedValueOnce({ ok: false, status: 401, text: async () => "Unauthorized" });
    const { handleCreateCheckout } = await import("../create-checkout.js");
    await expect(handleCreateCheckout({ amount: 5000, currency: "dzd", success_url: "https://example.com/success" })).rejects.toThrow("Chargily HTTP 401");
  });
});
