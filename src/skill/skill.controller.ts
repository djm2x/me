import { Controller, Get, Post, Body, Patch, Param, Delete, Inject } from '@nestjs/common';
import { SuperController } from 'src/shared/super.controller';
import { Skill } from './skill.entity';
import { SkillService } from './skill.service';

@Controller('skills')
export class SkillController extends SuperController<Skill> {

	constructor(protected service: SkillService) {
		super(service);
	}

}
