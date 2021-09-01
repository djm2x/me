import { Controller, Get, Post, Body, Patch, Param, Delete, Put } from '@nestjs/common';
import { BaseEntity, DeepPartial, Repository } from 'typeorm';

export abstract class SuperController<T> {
  constructor(protected  readonly service: Repository<T>) {}

  @Post('/post')
  post(@Body() model: T) {
    return this.service.save(model);
  }

  @Get('/get')
  get() {
    console.log((this.service as any).me);
    return this.service.find();
  }

  @Get('get/:id')
  findOne(@Param('id') id: number) {
    return this.service.findOne(+id);
  }

  @Patch('patch/:id')
  patch(@Param('id') id: number, @Body() model: T) {
    return this.service.update(+id, model);
  }

  @Put('put/:id')
  put(@Param('id') id: number, @Body() model: T) {
    return this.service.update(+id, model);
  }

  @Delete(':id')
  delete(@Param('id') id: number) {
    return this.service.delete(+id);
  }
}
