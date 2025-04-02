const fs = require('fs');
const path = require('path');
const config = require('../config');

/**
 * Logger service for storing collection history
 */
class Logger {
  constructor() {
    this.logs = {
      lastCollected: null,
      history: []
    };
    this.initialized = false;
  }

  /**
   * Initialize the logger and load existing logs if available
   */
  initialize() {
    if (this.initialized) return;

    try {
      // Ensure logs directory exists for local development
      if (!process.env.VERCEL) {
        const logDir = path.dirname(config.logs.filePath);
        if (!fs.existsSync(logDir)) {
          fs.mkdirSync(logDir, { recursive: true });
        }
      }

      // Load existing logs if available
      if (fs.existsSync(config.logs.filePath)) {
        const data = fs.readFileSync(config.logs.filePath, 'utf8');
        this.logs = JSON.parse(data);
      }

      this.initialized = true;
    } catch (error) {
      console.error(`Logger initialization error: ${error.message}`);
      // Continue with empty logs if there's an error
      this.initialized = true;
    }
  }

  /**
   * Log a collection attempt
   * @param {boolean} success - Whether the collection was successful
   * @param {object} data - Collection result data
   * @param {string} playerId - ID of the player
   * @param {Error} error - Error object if collection failed
   */
  logCollection(success, data, playerId, error = null) {
    if (!this.initialized) {
      this.initialize();
    }

    const timestamp = new Date().toISOString();

    const logEntry = {
      timestamp,
      playerId,
      success
    };

    if (success) {
      logEntry.data = data;
      this.logs.lastCollected = timestamp;
    } else {
      logEntry.error = error.message;
      if (error.response) {
        logEntry.errorDetails = error.response.data;
      }
    }

    this.logs.history.unshift(logEntry); // Add to the beginning for newest first

    // Limit log entries
    if (this.logs.history.length > config.logs.maxEntries) {
      this.logs.history = this.logs.history.slice(0, config.logs.maxEntries);
    }

    // Save logs to file
    this.saveLogs();

    return logEntry;
  }

  /**
   * Save logs to file
   */
  saveLogs() {
    try {
      fs.writeFileSync(config.logs.filePath, JSON.stringify(this.logs, null, 2));
    } catch (error) {
      console.error(`Failed to save logs: ${error.message}`);
    }
  }

  /**
   * Get all logs
   * @returns {object} - All logs
   */
  getLogs() {
    if (!this.initialized) {
      this.initialize();
    }
    return this.logs;
  }

  /**
   * Get recent logs (limited number)
   * @param {number} limit - Number of recent logs to return
   * @returns {Array} - Recent log entries
   */
  getRecentLogs(limit = 5) {
    if (!this.initialized) {
      this.initialize();
    }
    return {
      lastCollected: this.logs.lastCollected,
      history: this.logs.history.slice(0, limit)
    };
  }
}

// Export a singleton instance
module.exports = new Logger(); 