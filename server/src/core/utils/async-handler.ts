// type-imports
import type { Request, Response, NextFunction, RequestHandler } from 'express';

// type definition for the controller that will be wrapped by the async-handler
type Controller<R extends Request = Request, T = unknown> = (
  request: R,
  response: Response<T>,
  next: NextFunction
) => unknown | Promise<unknown>;

// function to wrap controllers inside async-handler
export function asyncHandler<R extends Request = Request, T = unknown>(
  controller: Controller<R, T>
): RequestHandler {
  return function (request, response, next) {
    return Promise.resolve(controller(request as R, response as Response<T>, next)).catch(next);
  };
}
