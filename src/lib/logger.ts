// Custom logger for production debugging
// Netlify only captures console.error() in production logs

type LogLevel = 'info' | 'warn' | 'error' | 'debug';

interface LogData {
  level: LogLevel;
  message: string;
  data?: any;
  timestamp: string;
  context?: string;
}

class ProductionLogger {
  private isProduction = process.env.NODE_ENV === 'production';
  
  private formatLog(level: LogLevel, message: string, data?: any, context?: string): LogData {
    return {
      level,
      message,
      data,
      timestamp: new Date().toISOString(),
      context
    };
  }

  private output(logData: LogData) {
    const prefix = `[${logData.level.toUpperCase()}]`;
    const contextStr = logData.context ? `[${logData.context}]` : '';
    const fullMessage = `${prefix}${contextStr} ${logData.message}`;
    
    if (this.isProduction) {
      // In production, use console.error so logs appear in Netlify
      console.error(fullMessage, logData.data || '');
    } else {
      // In development, use appropriate console methods
      switch (logData.level) {
        case 'error':
          console.error(fullMessage, logData.data || '');
          break;
        case 'warn':
          console.warn(fullMessage, logData.data || '');
          break;
        case 'debug':
        case 'info':
        default:
          console.log(fullMessage, logData.data || '');
          break;
      }
    }
  }

  info(message: string, data?: any, context?: string) {
    this.output(this.formatLog('info', message, data, context));
  }

  warn(message: string, data?: any, context?: string) {
    this.output(this.formatLog('warn', message, data, context));
  }

  error(message: string, data?: any, context?: string) {
    this.output(this.formatLog('error', message, data, context));
  }

  debug(message: string, data?: any, context?: string) {
    this.output(this.formatLog('debug', message, data, context));
  }

  // Payment specific logging methods
  paymentFlow(message: string, data?: any) {
    this.info(message, data, 'PAYMENT_FLOW');
  }

  paymentError(message: string, data?: any) {
    this.error(message, data, 'PAYMENT_ERROR');
  }

  phonepeApi(message: string, data?: any) {
    this.info(message, data, 'PHONEPE_API');
  }

  orderUpdate(message: string, data?: any) {
    this.info(message, data, 'ORDER_UPDATE');
  }
}

// Export singleton instance
export const logger = new ProductionLogger();

// Convenience exports for common patterns
export const logPaymentFlow = (message: string, data?: any) => logger.paymentFlow(message, data);
export const logPaymentError = (message: string, data?: any) => logger.paymentError(message, data);
export const logPhonepeApi = (message: string, data?: any) => logger.phonepeApi(message, data);
export const logOrderUpdate = (message: string, data?: any) => logger.orderUpdate(message, data);