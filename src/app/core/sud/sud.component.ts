import { Component, OnInit, ViewChild } from '@angular/core';
import { Sud } from 'src/app/models/sud';
import { SudService } from 'src/app/services/sud.service';
import { MatDialog } from '@angular/material/dialog';
import { SudDialogComponent } from '../../components/dialogs/sud-dialog/sud-dialog.component';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-sud',
  templateUrl: './sud.component.html',
  styleUrls: ['./sud.component.css']
})
export class SudComponent implements OnInit {

  displayedColumns = ['id', 'naziv', 'adresa', 'actions'];
  dataSource!: MatTableDataSource<Sud>; // Promenjeno na MatTableDataSource

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private sudService: SudService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.loadData();
  }

  public loadData() {
    this.sudService.getAllSuds().subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  // Funkcija za Filter (Pretragu)
  public applyFilter(filterValue: string) {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.dataSource.filter = filterValue;
  }

  public openDialog(flag: number, id?: number, naziv?: string, adresa?: string) {
    const dialogRef = this.dialog.open(SudDialogComponent, {
      data: { id, naziv, adresa, flag },
      width: '400px'
    });

    dialogRef.afterClosed().subscribe(res => {
      if (res === 1) {
        this.loadData();
      }
    });
  }
}