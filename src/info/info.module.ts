import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InfoService } from './info.service';
import { InfoController } from './info.controller';

@Module({
	controllers: [InfoController],
	imports: [
		TypeOrmModule.forFeature([InfoService]),
	],
	providers: [ ]
})
export class InfoModule {}
