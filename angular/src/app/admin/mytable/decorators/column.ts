import { Car } from './../resources/car';
import { ColumnModel } from './column.model';
import { TableModel } from './table.model';
import 'reflect-metadata';
// import 'core-js/es7/reflect';

export const tableSymbol = Symbol('column');

export function Column(options: Partial<ColumnModel> = {}) {
  // tslint:disable-next-line:only-arrow-functions
  return function(target: Car, propertyKey: string) {
    // console.log('decorator column for', propertyKey);
    // console.log(target);
    if (!target[tableSymbol]) {
      target[tableSymbol] = new TableModel();
    }
    options.key = options.key || propertyKey;
    const propType = Reflect.getMetadata('design:type', target, propertyKey);
    // console.log(propType);
    options.propertyType = propType?.name;
    const columnOptions = new ColumnModel(options);
    target[tableSymbol].addColumn(columnOptions);

    console.log(target.constructor.name);
    console.log( '>>>>>>>>>>>>>>>>', tableSymbol);
    console.log( tableSymbol);
    console.log( '>>>>>>>>>>>>>>>>', tableSymbol);
    console.log( target);
  };
}
