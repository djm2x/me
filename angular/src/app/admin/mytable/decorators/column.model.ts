export class ColumnModel {
  /** List of options */
  key: string;
  order: number | boolean;
  propertyType: any;
  canSort: boolean;
  canFilter: boolean;

  constructor(options: Partial<ColumnModel> = {}) {
    this.key = options.key;
    this.order = options.order || 0;
    this.propertyType = options.propertyType;
    this.canSort = options.canSort || false;
    this.canFilter = options.canFilter || false;
  }
}
