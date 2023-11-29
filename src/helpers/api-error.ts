export interface IErrorItem {
  type: string;
  messages: string[];
}
export class ApiError extends Error {
  status;
  errors;

  constructor(status: number, message: string, errors: IErrorItem[] = []) {
    super(message);
    this.status = status;
    this.errors = errors;
  }

  static BadRequest(message: string, errors: IErrorItem[] = []): ApiError {
    return new ApiError(400, message, errors);
  }

  static UnauthorizedError(): ApiError {
    return new ApiError(401, 'Пользователь не авторизован');
  }

  static NotFound(message: string): ApiError {
    return new ApiError(404, message);

  static Forbidden(): ApiError {
    return new ApiError(403, 'Доступ запрещён!');
  }
}
