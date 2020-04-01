import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { Logger } from 'nestjs-pino';

import { AppModule } from './app.module';

export async function bootstrap() {
    const app = await NestFactory.create(AppModule, { logger: false });
    const config = app.get(ConfigService);
    app.useLogger(app.get(Logger));
    app.useGlobalPipes(
        new ValidationPipe({
            validationError: {
                target: false,
            },
        }),
    );
    const port = config.get('port');
    await app.listen(port);
    return app;
}

if (process.env.NODE_ENV !== 'test') {
    bootstrap().then(async (app) => {
        console.log(`Main application is running on: ${await app.getUrl()}`, 'bootstrap');
    });
}
