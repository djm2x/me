export class ColumnModel {
  /** List of options */
  // label
  name: string;
  className: string;
  key: string;
  tableDisplay: boolean;
  formField: Field;
  serviceName: string;
  required: boolean;
  order: 'asc' | 'desc';
  propertyType: string | number | Date | boolean | object;
  canSort: boolean;
  canFilter: boolean;
  // case property is a foreign key (formField = select input)
  selectId: string;
  selectName: string;
  columns: ColumnModel[] = [];

  constructor(options: Partial<ColumnModel> = {}) {
    this.className = options.className;
    this.name = options.name || options.key;
    this.tableDisplay = options.tableDisplay !== undefined ? options.tableDisplay : true;
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
    this.selectId = options.formField === 'select' ? options.selectId : null;
    this.selectName = options.formField === 'select' ? options.selectName : null;
    //
    this.required = options.required || false;
    this.canSort = options.canSort || false;
    this.order = options.order || 'asc';
    this.canFilter = options.canFilter || false;
  }
}

type Field = 'text' | 'number' | 'select' | 'checkbox' | 'date' | 'id' | 'password';
