import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as session from 'express-session';
import * as passport from 'passport';
import * as cookieParser from 'cookie-parser';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
// import { SeedService } from './seed/seed.service';

async function bootstrap() {
  const PORT = process.env.PORT || 3000;
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  app.use(
    session({
      secret: 'g!o#o@g%l_e',
      saveUninitialized: false,
      resave: false,
      cookie: {
        maxAge: 5400000,
      },
    }),
  );
  app.use(passport.initialize());
  app.use(passport.session());
  app.use(cookieParser());
  app.enableCors({
    origin: 'http://localhost:3000',
    credentials: true,
  });
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
    }),
  );
  // const seedService = app.get(SeedService);
  // await seedService.seed();

  const config = new DocumentBuilder()
    .setTitle('Vinyl Store')
    .setDescription('The Vinyl Store Api documentation')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  await app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
}
bootstrap();
