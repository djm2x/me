import 'reflect-metadata';

type Target = {
  new(...args: any[]): any,
  name: string
};

// TypeScript function overloading for Invoking a function without parentheses
// export function Entity(opt: Partial<IEntity>): void;
// // tslint:disable-next-line:unified-signatures
// export function Entity(opt: any): void;

export function Entity(opt: Partial<IEntity> = {}) {
  // console.log('-- decorator factory invoked --');
  // tslint:disable-next-line:ban-types
  const plural = (name: string) => {
    return name.endsWith('s') ? `${name}es` : name.endsWith('y') ? `${name.slice(0, -1)}es` : `${name}s`;
  };

  return (target: any) => {
    opt.popup = !opt.popup ? false : true;
    opt.deleteRange = !opt.deleteRange ? false : true;
    opt.serviceName = opt.serviceName || plural(target.name).toLowerCase();
    opt.name = opt.name || target.name;
    opt.updateRoute = opt.updateRoute || 'update';

    target.prototype.opt = opt;

    // console.log(Object.getOwnPropertyNames(target.prototype));

    return target;
  };
}

export class IEntity {
  popup?: boolean;
  deleteRange?: boolean;
  serviceName?: string;
  name?: string;
  updateRoute?: string;
}
