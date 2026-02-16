import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Rociste } from 'src/app/models/rociste';
import { RocisteService } from 'src/app/services/rociste.service';


import { RocisteDialogComponent } from '../../dialogs/rociste-dialog/rociste-dialog.component';

@Component({
  selector: 'app-rociste',
  templateUrl: './rociste.component.html',
  styleUrls: ['./rociste.component.css']
})
export class RocisteComponent implements OnInit {

  displayedColumns = ['id', 'datum', 'sudnica', 'predmet', 'ucesnik', 'actions'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(public rocisteService: RocisteService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.loadData();
  }

  public loadData() {
    
    this.rocisteService.getAllRocista().subscribe((data: any) => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;

      this.dataSource.filterPredicate = (data: any, filter: string) => {
        const dataStr = (data.id || '') + 
                        (data.sudnica || '') + 
                        (data.predmet?.broj || '') + 
                        (data.ucesnik?.ime || '') + 
                        (data.ucesnik?.prezime || '');
        return dataStr.toLowerCase().indexOf(filter.toLowerCase()) !== -1;
      };
    });
  }

  public applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  public openDialog(flag: number, row?: any) {
    
    const dialogRef = this.dialog.open(RocisteDialogComponent, {
      data: row ? { ...row } : {} 
    });
    
    dialogRef.componentInstance.flag = flag;

    dialogRef.afterClosed().subscribe(res => {
      if (res === 1) {
        this.loadData();
      }
    });
  }
}