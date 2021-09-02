
import { Injectable } from '@angular/core';
import { AccountService } from './account.service';
import { ConfigService } from './config.service';
import { UserService } from './user.service';
import { InfoService } from './info.service';
import { ExperienceService } from './experience.service';
import { ProjectService } from './project.service';
import { SkillService } from './skill.service';
import { EducationService } from './education.service';
import { LanguageService } from './language.service';

@Injectable({
  providedIn: 'root'
})
export class UowService {
  config = new ConfigService();
  accounts = new AccountService();
  users = new UserService();
  infos = new InfoService();
  experiences = new ExperienceService();
  projects = new ProjectService();
  skills = new SkillService();
  educations = new EducationService();
  languages = new LanguageService();

  constructor() { }

  valideDate(date: Date): Date {
    date = new Date(date);

    const hoursDiff = date.getHours() - date.getTimezoneOffset() / 60;
    const minutesDiff = (date.getHours() - date.getTimezoneOffset()) % 60;
    date.setHours(hoursDiff);
    date.setMinutes(minutesDiff);

    return date;
  }

  arrayToString(t: string[]) {
    return t.map(e => `${e};`).reduce((p, c) => p + c);
  }

  stringToArray(s: string): string[] {
    const t = s.split(';');

    t.pop();

    return t;
  }
}
