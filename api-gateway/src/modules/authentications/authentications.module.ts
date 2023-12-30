import { Module } from '@nestjs/common';
import { AuthenticationsService } from './services/authentications.service';
import { AuthenticationsController } from './controllers/authentications.controller';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  controllers: [AuthenticationsController],
  providers: [AuthenticationsService],
  imports: [
    ClientsModule.registerAsync({
      clients: [
        {
          imports: [ConfigModule],
          inject: [ConfigService],
          name: 'AUTH_SERVICE',
          useFactory: async (configService: ConfigService) => {
            return {
              transport: Transport.RMQ,
              options: {
                noAck: true,
                queue: configService.get('RABBITMQ_AUTHS_QUEUE'),
                urls: [
                  `amqp://${configService.get(
                    'RABBITMQ_HOST',
                  )}:${configService.get('RABBITMQ_PORT')}`,
                ],
              },
            };
          },
        },
      ],
    }),
  ],
})
export class AuthenticationsModule {}
