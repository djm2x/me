import { ColumnModel } from './column.model';
import { TableModel } from './table.model';
import 'reflect-metadata';

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
    options.key = propertyKey;
    const propType = Reflect.getMetadata('design:type', target, propertyKey);
    // console.log(target.constructor.name, propType.name, Object.getOwnPropertyNames(propType.name))
    options.propertyType = propType?.name;

    const columnOptions = new ColumnModel(options);
    target[tableSymbol].addColumn(columnOptions);
  };
}