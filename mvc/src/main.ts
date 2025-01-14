
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { resolve} from 'path';
import { AppModule } from './app.module';
import * as hbs from 'hbs';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(
    AppModule,
  );

  app.useGlobalPipes(new ValidationPipe({ transform: true }));

  app.useStaticAssets(resolve('./src/views'));
  app.setBaseViewsDir(resolve('./src/views'));
  app.setViewEngine('hbs');

  hbs.registerPartials(resolve('src/views/partials'));

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
