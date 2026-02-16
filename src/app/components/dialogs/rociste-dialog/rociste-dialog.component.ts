import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { RocisteService } from 'src/app/services/rociste.service';
import { PredmetService } from 'src/app/services/predmet.service';
import { UcesnikService } from 'src/app/services/ucesnik.service';
import { Predmet } from 'src/app/models/predmet';
import { Ucesnik } from 'src/app/models/ucesnik';

@Component({
  selector: 'app-rociste-dialog',
  templateUrl: './rociste-dialog.component.html',
  styleUrls: ['./rociste-dialog.component.css']
})
export class RocisteDialogComponent implements OnInit {

  public flag!: number;
  predmeti!: Predmet[];
  ucesnici!: Ucesnik[];

  constructor(
    public snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<RocisteDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public rocisteService: RocisteService,
    public predmetService: PredmetService,
    public ucesnikService: UcesnikService
  ) { }

  ngOnInit(): void {
    this.predmetService.getAllPredmets().subscribe(res => {
      this.predmeti = res;
    });
    this.ucesnikService.getAllUcesniks().subscribe(res => {
      this.ucesnici = res;
    });
  }

  public comparePredmeti(a: any, b: any) {
    return a && b && a.id === b.id;
  }

  public compareUcesnici(a: any, b: any) {
    return a && b && a.id === b.id;
  }

  public add(): void {
    
    const novoRociste = {
      id: 0,
      datum_rocista: this.data.datum_rocista, 
      sudnica: this.data.sudnica,
      predmet: this.data.predmet,
      ucesnik: this.data.ucesnik
    };

    this.rocisteService.addRociste(novoRociste).subscribe(() => {
      this.snackBar.open('Uspešno dodato ročište!', 'U redu', { duration: 2500 });
      this.dialogRef.close(1);
    });
  }

  public update(): void {
    this.rocisteService.updateRociste(this.data).subscribe(() => {
      this.snackBar.open('Uspešno izmenjeno ročište!', 'U redu', { duration: 2500 });
      this.dialogRef.close(1);
    });
  }

  public delete(): void {
    this.rocisteService.deleteRociste(this.data.id).subscribe(() => {
      this.snackBar.open('Uspešno obrisano ročište!', 'U redu', { duration: 2500 });
      this.dialogRef.close(1);
    });
  }

  public cancel(): void {
    this.dialogRef.close();
  }
}