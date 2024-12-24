/* Desc: API Error handler */
export class ApiError extends Error {
  /**
   * The HTTP status code associated with the error.
   */
  public statusCode: number;

  /**
   * Creates an instance of ApiError.
   *
   * @param {string} message - The error message.
   * @param {number} [statusCode=500] - The HTTP status code (default is 500).
   */
  constructor(message: string, statusCode: number = 500) {
    super(message);
    this.statusCode = statusCode;
    Error.captureStackTrace(this, this.constructor);
  }
}
