const axios = require('axios');
const config = require('../config');

/**
 * Authentication service for Xsolla API
 */
class AuthService {
  /**
   * Authenticate with Xsolla using a player ID
   * @param {string} playerId - Player ID to authenticate
   * @returns {Promise<string>} - Authentication token
   */
  async authenticate(playerId) {
    console.log(`Authenticating player: ${playerId}`);

    try {
      const response = await axios.post(config.xsolla.authUrl, {
        settings: {
          projectId: config.xsolla.projectId,
          merchantId: config.xsolla.merchantId
        },
        loginId: config.xsolla.loginId,
        webhookUrl: config.xsolla.webhookUrl,
        user: {
          id: playerId,
          country: 'VN'
        },
        isUserIdFromWebhook: false
      });

      if (response.status === 201 && response.data.token) {
        console.log('Authentication successful!');
        return response.data.token;
      } else {
        throw new Error('Authentication failed: Invalid response format');
      }
    } catch (error) {
      console.error(`Authentication failed: ${error.message}`);
      if (error.response) {
        console.error(`Response data: ${JSON.stringify(error.response.data)}`);
        console.error(`Response status: ${error.response.status}`);
      }
      throw error;
    }
  }
}

// Export a singleton instance
module.exports = new AuthService(); 