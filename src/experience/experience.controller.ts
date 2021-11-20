import { Controller, Get, Post, Body, Patch, Param, Delete, Inject } from '@nestjs/common';
import { SuperController } from 'src/shared/super.controller';
import { Experience } from './experience.entity';
import { ExperienceService } from './experience.service';

@Controller('experiences')
export class ExperienceController extends SuperController<Experience> {

	constructor(protected service: ExperienceService) {
		super(service);
	}

}
