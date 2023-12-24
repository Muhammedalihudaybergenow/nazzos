import { Module } from '@nestjs/common';
import { ManagerModule } from './manager/manager.module';
import { ClientsModule } from './clients/clients.module';

@Module({
  imports: [ManagerModule, ClientsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
