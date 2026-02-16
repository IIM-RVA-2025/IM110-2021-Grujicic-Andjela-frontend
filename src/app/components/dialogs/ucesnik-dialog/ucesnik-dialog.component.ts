import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UcesnikService } from 'src/app/services/ucesnik.service';

@Component({
  selector: 'app-ucesnik-dialog',
  templateUrl: './ucesnik-dialog.component.html',
  styleUrls: ['./ucesnik-dialog.component.css']
})
export class UcesnikDialogComponent implements OnInit {

  public flag!: number;

  constructor(
    public dialogRef: MatDialogRef<UcesnikDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, 
    public ucesnikService: UcesnikService
  ) { }

  ngOnInit(): void { }

  public add(): void {
    this.ucesnikService.addUcesnik(this.data).subscribe(() => {
      this.dialogRef.close(1);
    });
  }

  public update(): void {
    this.ucesnikService.updateUcesnik(this.data).subscribe(() => {
      this.dialogRef.close(1);
    });
  }

  public delete(): void {
    this.ucesnikService.deleteUcesnik(this.data.id).subscribe(() => {
      this.dialogRef.close(1);
    });
  }

  public cancel(): void {
    this.dialogRef.close();
  }
}