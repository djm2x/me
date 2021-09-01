import { Module } from '@nestjs/common';
import { EducationService } from './education.service';
import { EducationController } from './education.controller';
import { UowService } from 'src/shared/uow.service';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  controllers: [EducationController],
  imports: [
    TypeOrmModule.forFeature([EducationService]),
  ],
  providers: [ ]
})
export class EducationModule {}
