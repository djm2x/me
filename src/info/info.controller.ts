import { Controller, Get, Post, Body, Patch, Param, Delete, Inject } from '@nestjs/common';
import { SuperController } from 'src/shared/super.controller';
import { Info } from './info.entity';
import { InfoService } from './info.service';

@Controller('infos')
export class InfoController extends SuperController<Info> {

	constructor(protected service: InfoService) {
		super(service);
	}

}
