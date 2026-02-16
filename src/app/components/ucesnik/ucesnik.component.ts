import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Ucesnik } from 'src/app/models/ucesnik';
import { UcesnikService } from 'src/app/services/ucesnik.service';
import { UcesnikDialogComponent } from '../dialogs/ucesnik-dialog/ucesnik-dialog.component';

@Component({
  selector: 'app-ucesnik',
  templateUrl: './ucesnik.component.html',
  styleUrls: ['./ucesnik.component.css']
})
export class UcesnikComponent implements OnInit {

  displayedColumns = ['id', 'ime', 'prezime', 'mbr', 'status', 'actions'];
  dataSource!: MatTableDataSource<Ucesnik>;

  
  selektovanUcesnik!: Ucesnik;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(public ucesnikService: UcesnikService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.loadData();
  }

  
  public selectRow(row: Ucesnik) {
    this.selektovanUcesnik = row;
  }

  public loadData() {
    this.ucesnikService.getAllUcesniks().subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;

      this.dataSource.filterPredicate = (data, filter: string) => {
        const accumulator = (currentTerm: any, key: string) => {
          return key === 'status' ? currentTerm + data.status : currentTerm + data[key as keyof Ucesnik];
        };
        const dataStr = Object.keys(data).reduce(accumulator, '').toLowerCase();
        const transformedFilter = filter.trim().toLowerCase();
        return dataStr.indexOf(transformedFilter) !== -1;
      };
    });
  }

  public applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  public openDialog(flag: number, row?: Ucesnik) {
    const dialogRef = this.dialog.open(UcesnikDialogComponent, {
      data: row ? { ...row } : new Ucesnik()
    });
    
    dialogRef.componentInstance.flag = flag;

    dialogRef.afterClosed().subscribe(res => {
      if (res === 1) {
        this.loadData(); 
      }
    });
  }
}