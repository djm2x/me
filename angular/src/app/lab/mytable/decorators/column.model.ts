export class ColumnModel {
  /** List of options */
  name: string;
  key: string;
  formField: Field;
  serviceName: string;
  required: boolean;
  order: number | boolean;
  propertyType: string | number | Date | boolean | object;
  canSort: boolean;
  canFilter: boolean;

  constructor(options: Partial<ColumnModel> = {}) {
    this.name = options.name || options.key;
    this.key = options.key;
    this.propertyType = options.propertyType;
    //
    this.formField = options.formField ||
      (options.propertyType === 'Date' ? 'date' :
      options.propertyType === 'Boolean' ? 'checkbox' :
        options.key === 'id' ? 'id' :
          options.propertyType === 'Number' ? 'number' : 'text')
      ;
    //
    this.serviceName = options.formField === 'select' ? options.serviceName : null;
    //
    this.required = options.required || false;
    this.order = options.order || 0;
    this.canSort = options.canSort || false;
    this.canFilter = options.canFilter || false;
  }
}

type Field = 'text' | 'number' | 'select' | 'checkbox' | 'date' | 'id';
