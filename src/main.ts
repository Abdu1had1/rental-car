import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { AuthGuard } from './auth/auth.guard';
import { Callback, Context, Handler } from 'aws-lambda';
import { INestApplication } from '@nestjs/common';
import { configure as serverlessExpress } from '@vendia/serverless-express';

let server: Handler;

async function bootstrap(): Promise<Handler> {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: '*', // You might want to specify the actual origin(s) here
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
    optionsSuccessStatus: 204,
  });
  setupSwagger(app);
  await app.init();
  const expressApp = app.getHttpAdapter().getInstance();
  return serverlessExpress({ app: expressApp });
}

function setupSwagger(nestApp: INestApplication): void {
  const options = new DocumentBuilder()
    .setTitle('Car Rental')
    .setDescription('The car rental API description')
    .setVersion('1.0')
    .addBearerAuth({
      type: "http",
      scheme: "bearer",
      bearerFormat: "JWT",
      name: "JWT",
      description: "Enter JWT Token",
      in: "header"
    }, "JWT-auth")
    .build();

  const document = SwaggerModule.createDocument(nestApp, options);
  SwaggerModule.setup('api', nestApp, document);
}

export const handler: Handler = async (
  event: any,
  context: Context,
  callback: Callback,
) => {
  event.path = `${event.path}/`;
  event.path = event.path.includes('swagger-ui')
    ? `swagger${event.path}`
    : event.path;
  server = server ?? (await bootstrap());
  return server(event, context, callback);
};
