import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Sud } from 'src/app/models/sud';
import { SudService } from 'src/app/services/sud.service';

@Component({
  selector: 'app-sud-dialog',
  templateUrl: './sud-dialog.component.html',
  styleUrls: ['./sud-dialog.component.css']
})
export class SudDialogComponent implements OnInit {

  public flag!: number;

  constructor(public snackBar: MatSnackBar,
              public dialogRef: MatDialogRef<SudDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: Sud,
              public sudService: SudService) { }

  ngOnInit(): void { }

  public add(): void {
    this.sudService.addSud(this.data).subscribe(() => {
      this.snackBar.open('Sud uspešno dodat', 'U redu', { duration: 2500 });
      this.dialogRef.close(1);
    });
  }

  public update(): void {
    this.sudService.updateSud(this.data).subscribe(() => {
      this.snackBar.open('Sud uspešno izmenjen', 'U redu', { duration: 2500 });
      this.dialogRef.close(1);
    });
  }

  public delete(): void {
    this.sudService.deleteSud(this.data.id).subscribe(() => {
      this.snackBar.open('Sud uspešno obrisan', 'U redu', { duration: 2500 });
      this.dialogRef.close(1);
    });
  }

  public cancel(): void {
    this.dialogRef.close();
  }
}