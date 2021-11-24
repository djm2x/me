export class ColumnModel {
  /** List of options */
  name: string;
  key: string;
  order: number | boolean;
  propertyType: string | number | Date | object;
  canSort: boolean;
  canFilter: boolean;

  constructor(options: Partial<ColumnModel> = {}) {
    this.key = options.key;
    this.name = options.name || options.key;
    this.order = options.order || 0;
    this.propertyType = options.propertyType;
    this.canSort = options.canSort || false;
    this.canFilter = options.canFilter || false;
  }
}
