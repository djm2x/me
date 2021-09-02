export class User {
  id = 0;
  username = '';
  password = '';
  email = '';
  role = '';
  imageUrl = '';
  isActive = true;
}

export class Info {
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
