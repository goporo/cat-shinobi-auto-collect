const { collector } = require('./src');

/**
 * Vercel API endpoint for collecting the daily Ruby Cat Stone
 * This function is triggered by the daily scheduled cron job
 */
module.exports = async (req, res) => {
  try {
    console.log('Running daily collection for default player ID');

    const result = await collector.collect();

    return res.status(200).json({
      timestamp: new Date().toISOString(),
      ...result
    });
  } catch (error) {
    console.error('Error in collect API route:', error);
    return res.status(500).json({
      error: error.message,
      timestamp: new Date().toISOString()
    });
  }
}; 