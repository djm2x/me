import { Global, Injectable, Module } from '@nestjs/common';
import { EducationService } from 'src/education/education.service';
import { EntityRepository } from 'typeorm';

@Injectable()
export class UowService {
  educations = new EducationService();

  
}

@Global()
@Module({
  exports:[UowService],
  providers:[UowService],
})
export class UowModule {}
