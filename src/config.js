/**
 * Configuration for the Cat Shinobi Ruby Stone Collector
 */
const config = {
  // Default player ID for scheduled collection
  playerId: '01JPPYZ4JPPX4HCJRA2VJ30X8H',

  // Xsolla API configuration
  xsolla: {
    projectId: 275454,
    merchantId: 755493,
    loginId: '59f5c4aa-bddb-4c6e-8feb-08aaf4edc6fe',
    collectUrl: 'https://store.xsolla.com/api/v2/project/275454/free/item/nns_shop_akaneko_1_1_web_free',
    authUrl: 'https://sb-user-id-service.xsolla.com/api/v1/user-id',
    webhookUrl: 'https://catshinobi-rest.prod.cookappsgames.com/xsolla/user'
  },

  // Logging configuration
  logs: {
    // Maximum number of log entries to keep
    maxEntries: 30,

    // File path for logs (if using Vercel, will use /tmp)
    filePath: process.env.VERCEL ? '/tmp/collector_logs.json' : './logs/collector_logs.json'
  }
};

module.exports = config; 