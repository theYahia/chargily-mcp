# chargily-mcp

MCP server for Chargily Pay payment gateway (Algeria).

## Tools (8)

| Tool | Description |
|---|---|
| `create_checkout` | Create a checkout session |
| `get_checkout` | Get checkout status |
| `list_checkouts` | List checkouts |
| `create_customer` | Create a customer |
| `list_customers` | List customers |
| `create_product` | Create a product |
| `list_products` | List products |
| `create_price` | Create a price for a product |

## Quick Start

```json
{
  "mcpServers": {
    "chargily": {
      "command": "npx",
      "args": ["-y", "@theyahia/chargily-mcp"],
      "env": {
        "CHARGILY_SECRET_KEY": "<YOUR_CHARGILY_SECRET_KEY>"
      }
    }
  }
}
```

## Environment Variables

| Variable | Required | Description |
|---|---|---|
| `CHARGILY_SECRET_KEY` | Yes | Secret key from Chargily dashboard |

## License

MIT
