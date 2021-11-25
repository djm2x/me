import { ColumnModel } from './column.model';
import { TableModel } from './table.model';
import 'reflect-metadata';
// import 'core-js/es7/reflect';

type Target = {
  new (...args: any[]): any,
  name: string
};

export const tableSymbol = Symbol('column');


export function Column(options: Partial<ColumnModel> = {}) {
  return (target: any, propertyKey: string) => {
    // console.log('decorator column for', propertyKey);

    if (!target[tableSymbol]) {
      target[tableSymbol] = new TableModel();
    }
    options.key = options.key || propertyKey;
    const propType = Reflect.getMetadata('design:type', target, propertyKey);
    // console.log(target.constructor.name, propType.name, Object.getOwnPropertyNames(propType.name))
    options.propertyType = propType?.name;

    const columnOptions = new ColumnModel(options);
    target[tableSymbol].addColumn(columnOptions);
  };
}

export function Entity(opt = new IEntity()) {
  // console.log('-- decorator factory invoked --');
  // tslint:disable-next-line:ban-types
  const plural = (name: string) => {
    return name.endsWith('s') ? `${name}es` : name.endsWith('y') ? `${name.slice(0, -1)}es` : `${name}s`;
  };

  return (target: any) => {
    opt.name = opt.name || target.name;
    opt.serviceName = opt.serviceName || plural(target.name).toLowerCase();

    target.prototype.opt = opt;

    console.log(Object.getOwnPropertyNames(target.prototype));

    return target;
  };
}

export class IEntity {
  popup = true;
  serviceName?: string;
  name?: string;
}
