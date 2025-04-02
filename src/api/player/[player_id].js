const { collector } = require('../../index');

/**
 * Vercel API endpoint for collecting the Ruby Cat Stone for a specific player
 */
module.exports = async (req, res) => {
  try {
    // Get the player ID from the URL parameter
    const playerId = req.query.player_id;

    if (!playerId) {
      return res.status(400).json({
        error: 'Missing player_id parameter',
        timestamp: new Date().toISOString()
      });
    }

    console.log(`Collecting for specific player: ${playerId}`);

    const result = await collector.collect(playerId);

    return res.status(200).json({
      timestamp: new Date().toISOString(),
      ...result
    });
  } catch (error) {
    console.error('Error in player collect API route:', error);
    return res.status(500).json({
      error: error.message,
      timestamp: new Date().toISOString()
    });
  }
}; 