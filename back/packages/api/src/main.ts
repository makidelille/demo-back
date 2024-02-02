import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

import { setup } from '@back/infrastructure';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
}
setup();
bootstrap();
