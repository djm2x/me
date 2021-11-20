import { EntityRepository, Repository } from 'typeorm';
import { Info } from './info.entity';

@EntityRepository(Info)
export class InfoService extends Repository<Info> {}
