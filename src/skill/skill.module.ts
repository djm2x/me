import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SkillService } from './skill.service';
import { SkillController } from './skill.controller';

@Module({
	controllers: [SkillController],
	imports: [
		TypeOrmModule.forFeature([SkillService]),
	],
	providers: [ ]
})
export class SkillModule {}
