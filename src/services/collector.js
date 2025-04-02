const axios = require('axios');
const config = require('../config');
const authService = require('./auth');
const logger = require('./logger');

/**
 * Collector service for Ruby Cat Stone collection
 */
class CollectorService {
  /**
   * Collect Ruby Cat Stone for a specific player
   * @param {string} playerId - Player ID to collect for (defaults to config if not provided)
   * @returns {Promise<object>} - Collection result
   */
  async collect(playerId = config.playerId) {
    console.log(`Collecting Ruby Cat Stone for player: ${playerId}`);

    try {
      // Authenticate to get token
      const token = await authService.authenticate(playerId);

      // Make collection request
      const response = await axios.post(config.xsolla.collectUrl, {}, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });

      // Check if collection was successful
      if (response.status >= 200 && response.status < 300) {
        console.log('Collection successful!', response.data);

        // Log the successful collection
        logger.logCollection(true, response.data, playerId);

        return {
          success: true,
          playerId,
          data: response.data
        };
      } else {
        throw new Error(`Unexpected status code: ${response.status}`);
      }
    } catch (error) {
      console.error(`Collection failed: ${error.message}`);
      if (error.response) {
        console.error(`Response data: ${JSON.stringify(error.response.data)}`);
        console.error(`Response status: ${error.response.status}`);
      }

      // Log the failed collection
      logger.logCollection(false, null, playerId, error);

      return {
        success: false,
        playerId,
        error: error.message,
        errorDetails: error.response ? error.response.data : null
      };
    }
  }
}

// Export a singleton instance
module.exports = new CollectorService(); 