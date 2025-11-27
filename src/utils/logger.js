/**
 * Production-Safe Logger Utility
 * Conditionally logs based on environment
 * Only logs in development, silent in production
 */

const isDevelopment = import.meta.env.MODE === 'development' || import.meta.env.DEV;

const logger = {
    /**
     * Log informational messages (only in development)
     * @param {...any} args - Arguments to log
     */
    log: (...args) => {
        if (isDevelopment) {
            console.log(...args);
        }
    },

    /**
     * Log warning messages (only in development)
     * @param {...any} args - Arguments to log
     */
    warn: (...args) => {
        if (isDevelopment) {
            console.warn(...args);
        }
    },

    /**
     * Log error messages (always logged for debugging)
     * @param {...any} args - Arguments to log
     */
    error: (...args) => {
        console.error(...args);
    },

    /**
     * Log info with emoji prefix (only in development)
     * @param {...any} args - Arguments to log
     */
    info: (...args) => {
        if (isDevelopment) {
            console.log('ℹ️', ...args);
        }
    },

    /**
     * Log success messages (only in development)
     * @param {...any} args - Arguments to log
     */
    success: (...args) => {
        if (isDevelopment) {
            console.log('✅', ...args);
        }
    },

    /**
     * Log debug messages (only in development)
     * @param {...any} args - Arguments to log
     */
    debug: (...args) => {
        if (isDevelopment) {
            console.debug('🔍', ...args);
        }
    },
};

export default logger;
