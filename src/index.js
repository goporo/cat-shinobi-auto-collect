const config = require('./config');
const collector = require('./services/collector');
const logger = require('./services/logger');

/**
 * Main entry point for the Cat Shinobi Ruby Stone Collector
 * This is what gets called when running the script directly
 */
async function main() {
  try {
    console.log('Starting Cat Shinobi Ruby Stone Collector...');
    const result = await collector.collect();
    console.log('Collection completed:', result);
    return result;
  } catch (error) {
    console.error('Unhandled error in main execution:', error);
    process.exit(1);
  }
}

// Execute main function when run directly
if (require.main === module) {
  main().catch(error => {
    console.error('Fatal error:', error);
    process.exit(1);
  });
}

// Export modules for API routes
module.exports = {
  config,
  collector,
  logger
}; 