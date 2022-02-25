import { EntityRepository, Repository } from 'typeorm';
import { MyTest } from './entities/my-test.entity';

@EntityRepository(MyTest)
export class MyTestService extends Repository<MyTest> { }

