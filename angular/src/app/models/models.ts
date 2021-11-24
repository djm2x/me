import { Entity, Column } from '../lab/mytable/decorators/column';

@Entity({popup: false})
export class User {
  @Column()
  id = null;

  @Column({ name: 'user name', order: true, canSort: true, canFilter: true})
  username = 'mourabit mohamed';

  @Column()
  password = '123';

  @Column({ order: true, canSort: false, canFilter: true})
  email = 'dj-m2x@hotmail.com';

  @Column({ order: true, canSort: false, canFilter: true})
  role = 'admin';

  @Column()
  imageUrl = '';

  @Column()
  isActive = true;
}

export class Info {
  id = 0;
  icon = '';
  text = '';
  name = '';
  href = '';
}

export class Experience {
  id = 0;
  period = '';
  societe = '';
  job = '';
  task = '';
  tech = '';
  links = '';
}

export class Project {
  id = 0;
  title = '';
  date = new Date();
  description = '';
  tech = '';
  image = '';
  url = '';
  isPrivate = false;
  git = '';
}

export class Skill {
  id = 0;
  domaine = '';
  items: { name: string, value: number }[] = [];
}

export class Education {
  id = 0;
  period = '';
  dipolma = '';
  universite = '';
}

export class Language {
  id = 0;
  lang = '';
  level = '';
}
