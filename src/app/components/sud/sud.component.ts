import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Sud } from 'src/app/models/sud';
import { SudService } from 'src/app/services/sud.service';
import { SudDialogComponent } from '../dialogs/sud-dialog/sud-dialog.component';

@Component({
  selector: 'app-sud',
  templateUrl: './sud.component.html',
  styleUrls: ['./sud.component.css']
})
export class SudComponent implements OnInit {

  displayedColumns = ['id', 'naziv', 'adresa', 'actions'];
  dataSource!: MatTableDataSource<Sud>;

  selektovanSud!: Sud;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(public sudService: SudService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.loadData();
  }
  
  public selectRow(row: Sud) {
    this.selektovanSud = row;
  }

  public loadData() {
    this.sudService.getAllSuds().subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  public openDialog(flag: number, row?: Sud) {
    const dialogRef = this.dialog.open(SudDialogComponent, { 
      data: row ? { ...row } : new Sud() 
    });
    dialogRef.componentInstance.flag = flag;

    dialogRef.afterClosed().subscribe(res => {
      if (res === 1) {
        this.loadData();
      }
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}