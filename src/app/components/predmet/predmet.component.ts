import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Predmet } from 'src/app/models/predmet';
import { PredmetService } from 'src/app/services/predmet.service';
import { PredmetDialogComponent } from '../dialogs/predmet-dialog/predmet-dialog.component';

@Component({
  selector: 'app-predmet',
  templateUrl: './predmet.component.html',
  styleUrls: ['./predmet.component.css']
})
export class PredmetComponent implements OnInit {

  
  displayedColumns = ['id', 'broj', 'opis', 'datum', 'aktivan', 'sud', 'actions'];
  
  dataSource!: MatTableDataSource<Predmet>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(public predmetService: PredmetService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.loadData();
  }

  public loadData() {
    this.predmetService.getAllPredmets().subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
      
      
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;

      //  Omogućava pretragu i po nazivu suda 
      this.dataSource.filterPredicate = (data: any, filter: string) => {
        const accumulator = (currentTerm: any, key: string) => {
          return key === 'sud' ? currentTerm + data.sud.naziv : currentTerm + data[key];
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

  // Otvaranje dijaloga za CRUD operacije
  public openDialog(flag: number, row?: Predmet) {
    const dialogRef = this.dialog.open(PredmetDialogComponent, {
      data: row ? { ...row } : new Predmet()
    });
    
    dialogRef.componentInstance.flag = flag;

    dialogRef.afterClosed().subscribe(res => {
      if (res === 1) {
        this.loadData(); 
      }
    });
  }
}