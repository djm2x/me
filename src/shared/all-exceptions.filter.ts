import {ExceptionFilter,Catch,ArgumentsHost,HttpException,HttpStatus,} from '@nestjs/common';
  
  @Catch()
  export class AllExceptionsFilter implements ExceptionFilter {
    catch(exception: any, host: ArgumentsHost) {
      const ctx = host.switchToHttp();
      const response = ctx.getResponse();
      const request = ctx.getRequest();
  
      const status = exception instanceof HttpException ? exception.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR;

      console.log(exception);
  
      response.status(status).json({
        message: exception.message,
        name: exception.message,
        path: request.url,
        statusCode: status,
        timestamp: new Date().toISOString(),
        // exception,
      });
    }
  }