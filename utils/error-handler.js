export class ErrorHandler extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode; // Correct property name
    Error.captureStackTrace(this, this.constructor); // Optional: capture stack trace
  }
}
