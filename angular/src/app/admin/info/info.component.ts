import { Component, OnInit, ViewChild, EventEmitter, Inject, OnDestroy } from '@angular/core';
import { merge, Subscription, Subject } from 'rxjs';
import { UpdateComponent } from './update/update.component';
import { UowService } from 'src/app/services/uow.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { DeleteService } from 'src/app/modules/delete/delete.service';
import { Info } from 'src/app/models/models';
import { startWith } from 'rxjs/operators';
import { FormControl } from '@angular/forms';
@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.scss']
})
export class InfoComponent implements OnInit, OnDestroy {
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  update = new Subject<boolean>();
  isLoadingResults = true;
  resultsLength = 0;
  isRateLimitReached = false;

  subs: Subscription[] = [];

  dataSource: Info[] = [];
  selectedList: Info[] = [];

  displayedColumns = ['select', 'icon', 'text', 'name', 'href', 'option'];

  panelOpenState = false;

  icon = new FormControl('');
  text = new FormControl('');
  name = new FormControl('');
  href = new FormControl('');




  constructor(public uow: UowService, public dialog: MatDialog
    , private mydialog: DeleteService, @Inject('BASE_URL') private url: string) {
  }

  ngOnInit() {
    const sub = merge(this.sort.sortChange, this.paginator.page, this.update).pipe(startWith(null as any)).subscribe(
      r => {
        r === true ? this.paginator.pageIndex = 0 : r = r;
        !this.paginator.pageSize ? this.paginator.pageSize = 10 : r = r;
        const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
        this.isLoadingResults = true;
        this.getPage(
          startIndex,
          this.paginator.pageSize,
          this.sort.active ? this.sort.active : 'id',
          this.sort.direction ? this.sort.direction : 'desc',
          this.icon.value === '' ? '*' : this.icon.value,
          this.text.value === '' ? '*' : this.text.value,
          this.name.value === '' ? '*' : this.name.value,
          this.href.value === '' ? '*' : this.href.value,

        );
      }
    );

    this.subs.push(sub);
  }

  reset() {
    this.icon.setValue('');
    this.text.setValue('');
    this.name.setValue('');
    this.href.setValue('');

    this.update.next(true);
  }

  search() {
    this.update.next(true);
  }

  getPage(startIndex, pageSize, sortBy, sortDir, icon, text, name, href,) {
    // const sub = this.uow.infos.getAll(startIndex, pageSize, sortBy, sortDir, icon, text, name, href,).subscribe(
      const sub = this.uow.infos.getList(startIndex, pageSize, sortBy, sortDir).subscribe(
      (r: any) => {
        console.log(r.list);
        this.dataSource = r.list;
        this.resultsLength = r.count;
        this.isLoadingResults = false;
      }
    );

    this.subs.push(sub);
  }

  openDialog(o: Info, text) {
    const dialogRef = this.dialog.open(UpdateComponent, {
      width: '1100px',
      disableClose: true,
      data: { model: o, title: text }
    });

    return dialogRef.afterClosed();
  }

  add() {
    this.openDialog(new Info(), `Ajouter Info`).subscribe(result => {
      if (result) {
        this.update.next(true);
      }
    });
  }

  edit(o: Info) {
    this.openDialog(o, `Modifier Info`).subscribe((result: Info) => {
      if (result) {
        this.update.next(true);
      }
    });
  }

  detail(o: Info) {
    this.openDialog(o, `Détail Info`).subscribe((result: Info) => {
      if (result) {
        this.update.next(true);
      }
    });
  }

  async delete(id: number) {
    const r = await this.mydialog.openDialog('Info').toPromise();
    if (r === 'ok') {
      const sub = this.uow.infos.delete(id).subscribe(() => this.update.next(true));

      this.subs.push(sub);
    }
  }

  displayImage(urlImage: string) {
    if (!urlImage) {
      return 'assets/404.jpg';
    }
    if (urlImage && urlImage.startsWith('http')) {
      return urlImage;
    }

    return `${this.url}/infos/${urlImage.replace(';', '')}`;
  }

  imgError(img: any) {
    img.src = 'assets/404.jpg';
  }

  //check box
  //
  isSelected(row: Info): boolean {
    return this.selectedList.find(e => e.id === row.id) ? true : false;
  }

  check(row: Info) {
    const i = this.selectedList.findIndex(o => row.id === o.id);
    const existe: boolean = i !== -1;

    existe ? this.selectedList.splice(i, 1) : this.selectedList.push(row);
  }

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected(): boolean {
    const numSelected = this.selectedList.length;
    const numRows = this.dataSource.length;

    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ? this.selectedList = [] : this.selectedList = Array.from(this.dataSource);
  }

  async deleteList() {
    const r = await this.mydialog.openDialog('role').toPromise();
    if (r === 'ok') {
      const sub = this.uow.infos.deleteRangeByIds(this.selectedList.map(e => e.id)).subscribe(() => {
        this.selectedList = [];
        this.update.next(true);
      });

      this.subs.push(sub);
    }
  }

  ngOnDestroy(): void {
    this.subs.forEach(e => {
      e.unsubscribe();
    });
  }

}

