import 'reflect-metadata';

function Relation() {
  // tslint:disable-next-line:only-arrow-functions
  return function(target: any, key: string) {
    const type = Reflect.getOwnMetadata('design:type', target, key);
    console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>');
    console.log(type);
    console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>');
  };
}

export class Person {
  name: string;
  @Relation()
  info: Date;
}
