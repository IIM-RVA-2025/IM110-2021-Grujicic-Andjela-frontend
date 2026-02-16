import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PredmetService } from 'src/app/services/predmet.service';
import { SudService } from 'src/app/services/sud.service';
import { Sud } from 'src/app/models/sud';

@Component({
  selector: 'app-predmet-dialog',
  templateUrl: './predmet-dialog.component.html',
  styleUrls: ['./predmet-dialog.component.css']
})
export class PredmetDialogComponent implements OnInit {

  public flag!: number;
  public sudovi!: Sud[];

  constructor(
    public snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<PredmetDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public predmetService: PredmetService,
    public sudService: SudService
  ) { }

  ngOnInit(): void {
    this.sudService.getAllSuds().subscribe(res => {
      this.sudovi = res;
    });
  }

  public compareSudovi(a: any, b: any) {
    return a && b && a.id === b.id;
  }

  public add(): void {
   
    const noviPredmet = {
      id: 0,
      brojPr: this.data.brojPr,
      opis: this.data.opis,
      datum_pocetka: this.data.datum_pocetka,
      aktivan: this.data.aktivan,
      sud: this.data.sud
    };

    this.predmetService.addPredmet(noviPredmet).subscribe(() => {
      this.snackBar.open('Uspješno dodat predmet: ' + noviPredmet.brojPr, 'U redu', { duration: 2500 });
      this.dialogRef.close(1);
    });
  }

  public update(): void {
    this.predmetService.updatePredmet(this.data).subscribe(() => {
      this.snackBar.open('Uspješno izmijenjen predmet: ' + this.data.brojPr, 'U redu', { duration: 2500 });
      this.dialogRef.close(1);
    });
  }

  public delete(): void {
    this.predmetService.deletePredmet(this.data.id).subscribe(() => {
      this.snackBar.open('Uspješno obrisan predmet', 'U redu', { duration: 2500 });
      this.dialogRef.close(1);
    });
  }

  public cancel(): void {
    this.dialogRef.close();
  }
}