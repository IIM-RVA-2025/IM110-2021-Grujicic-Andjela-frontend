import { Component, OnInit, ViewChild, Input, OnChanges } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Predmet } from 'src/app/models/predmet';
import { Sud } from 'src/app/models/sud'; 
import { PredmetService } from 'src/app/services/predmet.service';
import { PredmetDialogComponent } from '../dialogs/predmet-dialog/predmet-dialog.component';

@Component({
  selector: 'app-predmet',
  templateUrl: './predmet.component.html',
  styleUrls: ['./predmet.component.css']
})
export class PredmetComponent implements OnInit, OnChanges { // DODATO implements OnChanges

  @Input() selektovanSud!: Sud; 
  selektovanPredmet!: Predmet; 

  displayedColumns = ['id', 'broj', 'opis', 'datum', 'aktivan', 'sud', 'actions'];
  dataSource!: MatTableDataSource<Predmet>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(public predmetService: PredmetService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.loadData();
  }

  ngOnChanges(): void {
    if (this.selektovanSud) {
      this.loadData();
    }
  }

  public selectRow(row: Predmet) {
    this.selektovanPredmet = row;
  }

  public loadData() {
    this.predmetService.getAllPredmets().subscribe(data => {
      // Filtriranje predmeta po sudu (ako je sud izabran)
      let filtriraniPodaci = data;
      if (this.selektovanSud) {
        filtriraniPodaci = data.filter(p => p.sud && p.sud.id === this.selektovanSud.id);
      }

      this.dataSource = new MatTableDataSource(filtriraniPodaci);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;

      this.dataSource.filterPredicate = (data: any, filter: string) => {
        const accumulator = (currentTerm: any, key: string) => {
          return key === 'sud' ? currentTerm + (data.sud?.naziv || '') : currentTerm + data[key];
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