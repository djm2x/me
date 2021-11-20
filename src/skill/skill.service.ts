import { EntityRepository, Repository } from 'typeorm';
import { Skill } from './skill.entity';

@EntityRepository(Skill)
export class SkillService extends Repository<Skill> {}
