import { ColumnModel } from './column.model';
export class TableModel {
  columns: ColumnModel[] = [];

  addColumn(column: ColumnModel) {
    // check if this class.column is nested in onther object
    const index = this.columns.findIndex(e => e.propertyType === column.className);

    console.log(index);

    if (index !== -1) {
      this.columns[index].columns.push(column);
    }

    this.columns = [...this.columns, column];
  }
}
