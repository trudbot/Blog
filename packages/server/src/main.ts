import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: [
      'http://localhost:3000',
      'https://beta.trudbot.cn',
      'https://trudbot.cn',
    ],
    credentials: true,
  });
  await app.listen(4000);
}
bootstrap().then(() => {
  console.log('server started!');
});
