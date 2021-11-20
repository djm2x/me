import { Controller, Get, Post, Body, Patch, Param, Delete, Inject } from '@nestjs/common';
import { SuperController } from 'src/shared/super.controller';
import { Language } from './language.entity';
import { LanguageService } from './language.service';

@Controller('languages')
export class LanguageController extends SuperController<Language> {

	constructor(protected service: LanguageService) {
		super(service);
	}

}
