import { EntityRepository, Repository } from 'typeorm';
import { Language } from './language.entity';

@EntityRepository(Language)
export class LanguageService extends Repository<Language> {}
