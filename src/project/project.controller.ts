import { Controller, Get, Post, Body, Patch, Param, Delete, Inject } from '@nestjs/common';
import { SuperController } from 'src/shared/super.controller';
import { Project } from './project.entity';
import { ProjectService } from './project.service';

@Controller('projects')
export class ProjectController extends SuperController<Project> {

	constructor(protected service: ProjectService) {
		super(service);
	}

}
