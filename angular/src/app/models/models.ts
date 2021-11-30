import { Column } from '../lab/table/decorators/column.decorator';
import { Entity } from '../lab/table/decorators/entity.decorator';






@Entity({popup: false})
export class User {
  @Column()
  id: number = null;

  @Column({ name: 'user name', canSort: true, canFilter: true })
  username: string = 'mourabit mohamed';

  @Column()
  password: string = '123';

  @Column({ canSort: true, canFilter: true })
  email: string = 'dj-m2x@hotmail.com';

  @Column({ canFilter: true })
  role: string = 'admin';

  @Column()
  imageUrl: string = '';

  @Column()
  isActive: boolean = true;

  @Column({propertyType: 'Role' })
  roles: Role = new Role();

  // @Column({tableDisplay: false})
  // date: Date = new Date();

  // @Column({formField: 'select', serviceName: 'infos', name: 'Info', selectId: 'id', selectName: 'name', tableDisplay: false})
  // idInfo: number = null;
}


@Entity({popup: false})
export class Role {
  @Column()
  id: number = null;

  @Column()
  name: string = '';
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
