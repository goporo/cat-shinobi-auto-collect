const { logger } = require('../src');

/**
 * Vercel API endpoint for retrieving collection logs
 */
module.exports = async (req, res) => {
  try {
    // Get query parameters
    const limit = req.query.limit ? parseInt(req.query.limit, 10) : undefined;
    const recent = req.query.recent === 'true';

    // Get logs based on parameters
    let logs;
    if (recent) {
      logs = logger.getRecentLogs(limit || 5);
    } else {
      logs = logger.getLogs();
    }

    return res.status(200).json({
      timestamp: new Date().toISOString(),
      ...logs
    });
  } catch (error) {
    console.error('Error in logs API route:', error);
    return res.status(500).json({
      error: error.message,
      timestamp: new Date().toISOString()
    });
  }
}; 