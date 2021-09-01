import { UowService } from './../shared/uow.service';
import { Controller, Get, Post, Body, Patch, Param, Delete, Inject } from '@nestjs/common';
import { SuperController } from 'src/shared/super.controller';
import { Education } from './education.entity';
import { EducationService } from './education.service';

@Controller('educations')
export class EducationController extends SuperController<Education> {

  constructor(protected service: EducationService) {
    super(service);
  }
  
}
