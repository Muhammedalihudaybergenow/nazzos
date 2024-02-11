import { Module } from '@nestjs/common';
import { ManagerUserModule } from './manager-user/manager-user.module';
import { ManagerRolesModule } from './manager-roles/manager-roles.module';
import { ManagerPermissionsModule } from './manager-permissions/manager-permissions.module';
import { ClientProxy, ClientsModule, Transport } from '@nestjs/microservices';
import { ConfigModule, ConfigService } from '@nestjs/config';
@Module({
  imports: [
    ManagerUserModule,
    ManagerRolesModule,
    ManagerPermissionsModule,
    ClientsModule.registerAsync({
      isGlobal: false,
      clients: [
        {
          imports: [ConfigModule],
          inject: [ConfigService],
          name: 'USERS_SERVICE',
          useFactory: async (config: ConfigService) => {
            return {
              transport: Transport.RMQ,
              options: {
                noAck: true,
                queue: config.get('RABBITMQ_USERS_QUEUE'),
                urls: [
                  `amqp://${config.get<string>(
                    'RABBITMQ_HOST',
                  )}:${config.get<number>('RABBITMQ_PORT')}`,
                ],
              },
            };
          },
        },
      ],
    }),
  ],
})
export class ManagersModule {}
