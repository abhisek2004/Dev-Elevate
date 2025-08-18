// Environment-based logging utility
// In production, logs are suppressed for security and performance
// In development, logs are shown for debugging purposes

const isDevelopment = import.meta.env.DEV;

export const logger = {
    // Info logging - only in development
    info: (message: string, ...args: any[]) => {
        if (isDevelopment) {
            console.log(`[INFO] ${message}`, ...args);
        }
    },

    // Debug logging - only in development
    debug: (message: string, ...args: any[]) => {
        if (isDevelopment) {
            console.log(`[DEBUG] ${message}`, ...args);
        }
    },

    // Warning logging - always shown (important for production)
    warn: (message: string, ...args: any[]) => {
        console.warn(`[WARN] ${message}`, ...args);
    },

    // Error logging - always shown (critical for production)
    error: (message: string, ...args: any[]) => {
        console.error(`[ERROR] ${message}`, ...args);
    },

    // Group logging - only in development
    group: (label: string) => {
        if (isDevelopment) {
            console.group(label);
        }
    },

    // Group end - only in development
    groupEnd: () => {
        if (isDevelopment) {
            console.groupEnd();
        }
    }
};

// Export individual methods for convenience
export const { info, debug, warn, error, group, groupEnd } = logger;
