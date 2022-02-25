import { Module } from '@nestjs/common';
import { MyTestService } from './my-test.service';
import { MyTestController } from './my-test.controller';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  controllers: [MyTestController],
  imports: [
		TypeOrmModule.forFeature([MyTestService]),
	],
  providers: []
})
export class MyTestModule {}
