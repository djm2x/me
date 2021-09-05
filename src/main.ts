import { RolesGuard } from './shared/roles.guard';
import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import * as helmet from 'helmet';
import * as rateLimit from 'express-rate-limit';
import { ValidationPipe } from '@nestjs/common';
// const { version } = require("../package.json");
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(
    AppModule,
    {
      // logger: Boolean(process.env.ENABLELOGGING),
      // logger: console,
    },
  );

  /**
   * Helmet can help protect your app from some well-known
   * web vulnerabilities by setting HTTP headers appropriately.
   * Generally, Helmet is just a collection of 12 smaller
   * middleware functions that set security-related HTTP headers
   *
   * https://github.com/helmetjs/helmet#how-it-works
   */
   app.use(helmet());

   /**
   * To protect your applications from brute-force attacks
   */
  app.use(
    new rateLimit({
      windowMs: 15 * 60 * 1000,
      max: 100,
    }),
  );

  /**
   * Apply validation for all inputs globally
   */
   app.useGlobalPipes(
    new ValidationPipe({
      /**
       * Strip away all none-object existing properties
       */
      whitelist: true,
      /***
       * Transform input objects to their corresponding DTO objects
       */
      transform: true,
    }),
  );

  // app.useGlobalGuards(new RolesGuard(new Reflector()));

  app.use('*', (req, res, next) => {
    // basic middleware
    console.log(`express:req from ${req.originalUrl}`);
    console.log(`express:req type ${req.method}`);
    
    next();
  })


  app.setGlobalPrefix('api');


  app.enableCors();

  const options = new DocumentBuilder()
      .setTitle('NestJS Role Based Auth Starter')
      .setVersion('1.0.0')
      .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('docs', app, document);


  await app.listen(3000);


  console.log(`Application is running on: ${await app.getUrl()}`);
}


bootstrap();
