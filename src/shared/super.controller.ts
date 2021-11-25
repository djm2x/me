import { Controller, Get, Post, Body, Patch, Param, Delete, Put } from '@nestjs/common';
import { BaseEntity, DeepPartial, Repository } from 'typeorm';

export abstract class SuperController<T> {
  constructor(protected  readonly service: Repository<T>) {}

  @Get('/getAll/:startIndex/:pageSize/:sortBy/:sortDir')
  async getList(@Param('startIndex') startIndex, @Param('pageSize') pageSize, @Param('sortBy') sortBy, @Param('sortDir') sortDir) {

    const [list, count] = await this.service.createQueryBuilder('e')
      .orderBy(sortBy, sortDir.toUpperCase())
      .skip(startIndex)
      .take(pageSize)
      .getManyAndCount()
      ;

    return {list, count};
  }

  @Post('/post')
  async post(@Body() model: T) {
      await this.service.insert(model);
  }

  @Get('/get')
  async get() {
    return await this.service.find();
  }

  @Get('get/:id')
  async findOne(@Param('id') id: number) {
    return await this.service.findOne(+id);
  }

  @Patch('patch/:id')
  async patch(@Param('id') id: number, @Body() model: T) {
    return await this.service.update(+id, model);
  }

  @Put('put/:id')
  async put(@Param('id') id: number, @Body() model: T) {
    return await this.service.update(+id, model);
  }

  @Delete(':id')
  async delete(@Param('id') id: number) {
    return await this.service.delete(+id);
  }
}
