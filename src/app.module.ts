import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { XModule } from './x/x.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    XModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
