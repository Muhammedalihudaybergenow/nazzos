import { Module } from '@nestjs/common';
import { ManagersModule } from './managers/managers.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [ManagersModule, UsersModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
