import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { MyTestService } from './my-test.service';
import { Public } from 'src/shared/public.decorator';
import { SuperController } from 'src/shared/super.controller';
import { MyTest } from './entities/my-test.entity';

@Controller('my-tests')
export class MyTestController extends SuperController<MyTest> {

	constructor(protected service: MyTestService) {
		super(service);
	}

  // @Public()
  // @Post('')
  // async create(@Body() model: MyTest) {
  //   const r = await this.service.insert(model);

  //   model = Object.assign(model, r.identifiers[0]);

  //   return model;
  // }

}
