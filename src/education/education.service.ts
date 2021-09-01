import { EntityRepository, Repository } from 'typeorm';
import { Education } from './education.entity';

@EntityRepository(Education)
export class EducationService extends Repository<Education> {
    me = {msg: 'you & me'}
}
