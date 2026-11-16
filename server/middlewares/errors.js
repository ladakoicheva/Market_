import { MYSQL_ERROR_MAP } from "../dbSQL/errorsMap.js";


export const errorMiddleware = (err, req, res, next) => {
  
  console.error(`[ERROR] ${req.method} ${req.originalUrl}:`, err);

  const mysqlError = MYSQL_ERROR_MAP[err.code];
  if (mysqlError) {
    return res.status(mysqlError.status).json({
      ok: false,
      e: mysqlError.message,
    });
  }

 
  const statusCode = err.statusCode || 500;
  const message = err.statusCode ? err.message : 'Internal server Error';

  return res.status(statusCode).json({
    ok: false,
    e:message,
    
  
  });
};