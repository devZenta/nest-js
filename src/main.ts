import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module.js';
import { ValidationPipe } from '@nestjs/common';
import { AuthGuard } from './common/guards/auth.guard.js';
import { doubleCsrf } from 'csrf-csrf';
import helmet from 'helmet';
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );
  app.useGlobalGuards(new AuthGuard());
  app.set('trust proxy', 'loopback');
  app.setGlobalPrefix('api');
  app.enableCors({
    origin: ['http://localhost:3000'],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    exposedHeaders: ['Content-Type', 'Authorization'],
    maxAge: 3600,
    preflightContinue: false,
    optionsSuccessStatus: 204,
    credentials: true,
  });
  const { doubleCsrfProtection } = doubleCsrf({
    cookieOptions: {
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      httpOnly: true,
      maxAge: 3600,
    },
    getSecret: () => process.env.CSRF_SECRET as string,
    getSessionIdentifier: (req) => req.sessionID as string,
  });
  app.use(doubleCsrfProtection);
  app.use(
    helmet({
      crossOriginOpenerPolicy: false,
      contentSecurityPolicy: false,
      crossOriginEmbedderPolicy: false,
      crossOriginResourcePolicy: false,
      originAgentCluster: false,
      permittedCrossDomainPolicies: false,
      referrerPolicy: false,
      strictTransportSecurity: false,
      xContentTypeOptions: false,
      xDnsPrefetchControl: false,
      xDownloadOptions: false,
      xFrameOptions: false,
      xXssProtection: false,
    }),
  );
  await app.listen(process.env.PORT ?? 3000);
}
void bootstrap();
