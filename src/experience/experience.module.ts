import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ExperienceService } from './experience.service';
import { ExperienceController } from './experience.controller';

@Module({
	controllers: [ExperienceController],
	imports: [
		TypeOrmModule.forFeature([ExperienceService]),
	],
	providers: [ ]
})
export class ExperienceModule {}
