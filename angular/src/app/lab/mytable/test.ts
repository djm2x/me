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


export type Target = {
  new (...args: any[]): any,
  name: string
};

export function Component(target: Target): void;
export function Component(name: string): (target: Target) => void;
export function Component(nameOrTarget: string | Target) {
  if (typeof nameOrTarget !== 'string') {
    console.log(nameOrTarget.name, ' is now decorated');
  } else {
    return (target: Target) => {
      const name = nameOrTarget || target.name;
      console.log(name, ' is now decorated');
    };
  }
}

@Component
export class MyDatabase { }

@Component('Hello Db')
// tslint:disable-next-line:component-class-suffix
export class MyHelloDatabase { }

