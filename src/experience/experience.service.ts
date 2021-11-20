import { EntityRepository, Repository } from 'typeorm';
import { Experience } from './experience.entity';

@EntityRepository(Experience)
export class ExperienceService extends Repository<Experience> {}
