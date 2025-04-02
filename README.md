# Cat Shinobi Ruby Stone Collector

Serverless API for collecting daily free Ruby Cat Stones from the Cat Shinobi game.

## Features

- Automated daily collection at 8:00 AM
- Collect for any player ID using the API endpoint
- Persistent logging system
- Clean modular architecture

## Project Structure

```
├── src/                # Core application code
│   ├── api/            # API routes for Vercel serverless functions
│   │   ├── collect.js  # Default collection endpoint (used by cron)
│   │   ├── logs.js     # Logs retrieval endpoint
│   │   └── player/     # Player-specific endpoints
│   │       └── [player_id].js  # Dynamic route for collecting by player ID
│   ├── config.js       # Configuration settings
│   ├── index.js        # Main entry point
│   ├── services/       # Service modules
│   │   ├── auth.js     # Authentication service
│   │   ├── collector.js # Collection service
│   │   └── logger.js   # Logging service
│   └── utils/          # Utility functions
├── vercel.json         # Vercel deployment configuration
├── package.json        # Project dependencies and scripts
└── README.md           # Documentation
```

## Vercel Deployment

### Deployment Steps

1. Push this repository to GitHub, GitLab, or Bitbucket.
2. Import the project in Vercel.
3. Deploy the project.

## API Endpoints

### Default Collection

```
GET /api/collect
```

Response:
```json
{
  "timestamp": "2023-01-01T08:00:01.234Z",
  "success": true,
  "playerId": "01JPPYZ4JPPX4HCJRA2VJ30X8H",
  "data": {
    "order_id": 123456789
  }
}
```

### Collect for Specific Player

```
GET /api/player/{player_id}
```

Example:
```
GET /api/player/01JPPYZ4JPPX4HCJRA2VJ30X8H
```

Response:
```json
{
  "timestamp": "2023-01-01T08:00:01.234Z",
  "success": true,
  "playerId": "01JPPYZ4JPPX4HCJRA2VJ30X8H",
  "data": {
    "order_id": 123456789
  }
}
```

### Get Logs

```
GET /api/logs
```

Parameters:
- `recent=true` - Get only recent logs (default: false)
- `limit=10` - Limit the number of logs (default: all for full logs, 5 for recent logs)

Example:
```
GET /api/logs?recent=true&limit=3
```

Response:
```json
{
  "timestamp": "2023-01-01T12:00:00.123Z",
  "lastCollected": "2023-01-01T08:00:01.234Z",
  "history": [
    {
      "timestamp": "2023-01-01T08:00:01.234Z",
      "playerId": "01JPPYZ4JPPX4HCJRA2VJ30X8H",
      "success": true,
      "data": {
        "order_id": 123456789
      }
    },
    // More log entries
  ]
}
```

## Configuration

The configuration is stored in `src/config.js`. Key settings include:

- Default player ID: `01JPPYZ4JPPX4HCJRA2VJ30X8H`
- Xsolla API settings
- Logging configuration

## Local Development

1. Install dependencies:
   ```
   npm install
   ```

2. Run the collection:
   ```
   npm run collect
   ```

3. Start development server:
   ```
   npm run dev
   ```

4. View logs:
   ```
   npm run logs
   ``` 