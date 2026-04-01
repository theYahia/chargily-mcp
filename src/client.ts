const BASE_URL = "https://pay.chargily.com/test/api/v2";
const TIMEOUT = 15_000;

export class ChargilyClient {
  private chargily_secret_key: string;

  constructor() {
    this.chargily_secret_key = process.env.CHARGILY_SECRET_KEY ?? "";
    if (!this.chargily_secret_key) {
      throw new Error("Environment variable(s) CHARGILY_SECRET_KEY required. See https://dev.chargily.com/pay-v2/");
    }
  }

  private getHeaders() { return { "Authorization": `Bearer ${this.chargily_secret_key}` }; }

  async request(method: string, path: string, body?: unknown): Promise<unknown> {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), TIMEOUT);
    try {
      const response = await fetch(`${BASE_URL}${path}`, {
        method,
        headers: {
          ...this.getHeaders(),
          "Content-Type": "application/json",
        },
        body: body ? JSON.stringify(body) : undefined,
        signal: controller.signal,
      });
      clearTimeout(timer);
      if (!response.ok) {
        const text = await response.text();
        throw new Error(`Chargily HTTP ${response.status}: ${text}`);
      }
      const ct = response.headers.get("content-type") ?? "";
      if (ct.includes("application/json")) return response.json();
      return response.text();
    } catch (error) {
      clearTimeout(timer);
      if (error instanceof DOMException && error.name === "AbortError") {
        throw new Error("Chargily: request timeout (15s).");
      }
      throw error;
    }
  }
}
