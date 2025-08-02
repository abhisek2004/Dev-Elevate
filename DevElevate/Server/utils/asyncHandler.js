// to handle all the async route handlers without using try-catch blocks. this function takes the async functions and if there's any rejected promise we return that to express's next()

const asyncHandler = (requesHandler) => {
  return (req, res, next) => {
    Promise.resolve(requesHandler(req, res, next)).catch((err) => next(err));
  };
};

export { asyncHandler };