import { Component, OnInit, OnDestroy } from '@angular/core';
import { SudService } from 'src/app/services/sud.service';
import { PredmetService } from 'src/app/services/predmet.service';
import { RocisteService } from 'src/app/services/rociste.service';
import { UcesnikService } from 'src/app/services/ucesnik.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {

  vreme: Date = new Date();
  timer: any;
  statusSistema: string = 'Sistem je online'; 

  brojSudova: number = 0;
  brojPredmeta: number = 0;
  brojRocista: number = 0;
  brojUcesnika: number = 0;

  constructor(
    private sudService: SudService,
    private predmetService: PredmetService,
    private rocisteService: RocisteService,
    private ucesnikService: UcesnikService
  ) { }

  ngOnInit(): void {
    this.ucitajStatistiku();
    this.timer = setInterval(() => {
      this.vreme = new Date();
    }, 1000);
  }

  ngOnDestroy(): void {
    if (this.timer) {
      clearInterval(this.timer);
    }
  }

  ucitajStatistiku() {
    this.sudService.getAllSuds().subscribe((data: any) => this.brojSudova = data.length);
    this.predmetService.getAllPredmets().subscribe((data: any) => this.brojPredmeta = data.length);
    this.rocisteService.getAllRocista().subscribe((data: any) => this.brojRocista = data.length);
    this.ucesnikService.getAllUcesniks().subscribe((data: any) => this.brojUcesnika = data.length);
  }
}