import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProjectService } from './project.service';
import { ProjectController } from './project.controller';

@Module({
	controllers: [ProjectController],
	imports: [
		TypeOrmModule.forFeature([ProjectService]),
	],
	providers: [ ]
})
export class ProjectModule {}
