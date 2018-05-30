import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-flowers',
  templateUrl: './flowers.component.html',
  styleUrls: ['./flowers.component.css']
})
export class FlowersComponent implements OnInit {
  public cantTime: number = -1;
  public period: string = '-1';
  public timer: number = 0;
  public timerCant: number = 10000;

  public interval: any;
  public colSizeSiembra: string = '';

  public epoca: number = -1;
  public media: number = 0;
  public desviacion: number = 0;
  public inferior: number = 0;
  public superior: number = 0;
  public mediapor: number = 0;
  public desviacionpor: number = 0;
  public inferiorpor: number = 0;
  public superiorpor: number = 0;

  public objectFlowers1: any[] = [];
  public objectFlowers2: any[] = [];
  public objectFlowers3: any[] = [];
  public objectFlowers4: any[] = [];
  public objectFlowers5: any[] = [];
  public objectFlowers6: any[] = [];
  public objectFlowers7: any[] = [];
  public objectFlowers8: any[] = [];
  public objectFlowers9: any[] = [];
  public objectFlowers10: any[] = [];
  public objectFlowers11: any[] = [];
  public objectFlowers12: any[] = [];

  public objectDemanda: any[] = [];
  public objectPorcentaje: any[] = [];
  public objectVentaFlores: any[] = [];
  public objectArea: any[] = [];
  public objectColores: any[] = [];

  constructor() {
    document.documentElement.style.setProperty(`--bg-body`, '#6bc4ee');
    this.changeSelector()
  }

  ngOnInit() {
  }

  changeSelector() {
    this.objectFlowers1 = [];
    this.objectFlowers2 = [];
    this.objectFlowers3 = [];
    this.objectFlowers4 = [];
    this.objectFlowers5 = [];
    this.objectFlowers6 = [];
    this.objectFlowers7 = [];
    this.objectFlowers8 = [];
    this.objectFlowers9 = [];
    this.objectFlowers10 = [];
    this.objectFlowers11 = [];
    this.objectFlowers12 = [];
    clearInterval(this.interval);
    if ('-1' && this.cantTime.toString() !== '-1' && this.period.toString() !== '-1') {

      this.colSizeSiembra = 'col-12';

      this.timer = 0;
      this.interval = setInterval(() => {
        if (this.timer < this.cantTime) {
          this.timer += 1
          this.objectRandom()
        } else {
          clearInterval(this.interval);
        }
      }, this.timerCant);
    }
  }

  plusTimer() {
    clearInterval(this.interval);
    this.timerCant = this.timerCant + 1000;
    if (this.timerCant >= 60000) {
      this.timerCant = 60000;
    }
    this.interval = setInterval(() => {
      if (this.timer < this.cantTime) {
        this.timer += 1
        this.objectRandom()
      } else {
        clearInterval(this.interval);
      }
    }, this.timerCant);
  }

  minusTimer() {
    clearInterval(this.interval);
    this.timerCant = this.timerCant - 1000;
    if (this.timerCant <= 0) {
      this.timerCant = 1000;
    }
    this.interval = setInterval(() => {
      if (this.timer < this.cantTime) {
        this.timer += 1
        this.objectRandom()
      } else {
        clearInterval(this.interval);
      }
    }, this.timerCant);
  }

  changeSelectorEpoca() {
    this.objectDemanda = [];
    switch (this.epoca.toString()) {
      case '46':
        this.media = 46;
        this.desviacion = 2.3;
        this.mediapor = 85;
        this.desviacionpor = 3;
        break;
      case '48':
        this.media = 48;
        this.desviacion = 0.96;
        this.mediapor = 78;
        this.desviacionpor = 11;
        break;
      case '19':
        this.media = 19;
        this.desviacion = 1.33;
        this.mediapor = 50;
        this.desviacionpor = 9;
        break;
      case '17':
        this.media = 17;
        this.desviacion = 0.86;
        this.mediapor = 68;
        this.desviacionpor = 7;
        break;
      case '14':
        this.media = 14;
        this.desviacion = 0.7;
        this.mediapor = 58;
        this.desviacionpor = 4;
        break;

      default:
        break;
    }

    this.inferior = this.media - this.desviacion;
    this.superior = this.media + this.desviacion;

    this.inferiorpor = this.mediapor - this.desviacionpor;
    this.superiorpor = this.mediapor + this.desviacionpor;

    for (let index = 0; index < this.cantTime; index++) {
      let rand = Math.random();
      let cost = this.inferior + rand * (this.superior - this.inferior);
      this.objectDemanda.push({ id: index + 1, random: rand, costo: cost })

      let randpor = Math.random();
      let roj = this.inferiorpor + rand * (this.superiorpor - this.inferiorpor);
      let colo = 100 - Math.round(roj);
      this.objectPorcentaje.push({ id: index + 1, random: randpor, roja: Math.round(roj), color: colo });

      this.objectVentaFlores.push({ id: index + 1, roja: (cost * Math.round(roj)) / 100, color: (cost * Math.round(colo)) / 100 })

      this.objectArea.push({ id: index + 1, roja: (((cost * Math.round(roj)) / 100) * 100) / 140, color: (((cost * Math.round(colo)) / 100) * 100) / 140 })

      this.objectColores.push(
        {
          id: index + 1,
          blanco: (15 * (cost * Math.round(colo)) / 100) / 100,
          amarillo: (15 * (cost * Math.round(colo)) / 100) / 100,
          naranja: (15 * (cost * Math.round(colo)) / 100) / 100,
          oscuro: (15 * (cost * Math.round(colo)) / 100) / 100,
          claro: (15 * (cost * Math.round(colo)) / 100) / 100,
          rosado: (8 * (cost * Math.round(colo)) / 100) / 100,
          lavanda: (5 * (cost * Math.round(colo)) / 100) / 100,
          verde: (4 * (cost * Math.round(colo)) / 100) / 100,
          durazno: (3 * (cost * Math.round(colo)) / 100) / 100,
          roja: (1 * (cost * Math.round(colo)) / 100) / 100,
          amarillanaranja: (4 * (cost * Math.round(colo)) / 100) / 100,
        }
      )
    }
  }

  objectRandom() {
    for (let index = 0; index < Math.floor((Math.random() * 200) + 1); index++) {
      this.objectFlowers1.push({ flower: Math.floor((Math.random() * 3) + 1) })
    }

    for (let index = 0; index < Math.floor((Math.random() * 5) + 1); index++) {
      this.objectFlowers2.push({ flower: Math.floor((Math.random() * 3) + 1) })
    }

    for (let index = 0; index < Math.floor((Math.random() * 5) + 1); index++) {
      this.objectFlowers3.push({ flower: Math.floor((Math.random() * 3) + 1) })
    }

    for (let index = 0; index < Math.floor((Math.random() * 5) + 1); index++) {
      this.objectFlowers4.push({ flower: Math.floor((Math.random() * 3) + 1) })
    }

    for (let index = 0; index < Math.floor((Math.random() * 5) + 1); index++) {
      this.objectFlowers5.push({ flower: Math.floor((Math.random() * 3) + 1) })
    }

    for (let index = 0; index < Math.floor((Math.random() * 5) + 1); index++) {
      this.objectFlowers6.push({ flower: Math.floor((Math.random() * 3) + 1) })
    }

    for (let index = 0; index < Math.floor((Math.random() * 4) + 1); index++) {
      this.objectFlowers7.push({ flower: Math.floor((Math.random() * 3) + 1) })
    }

    for (let index = 0; index < Math.floor((Math.random() * 4) + 1); index++) {
      this.objectFlowers8.push({ flower: Math.floor((Math.random() * 3) + 1) })
    }

    for (let index = 0; index < Math.floor((Math.random() * 3) + 1); index++) {
      this.objectFlowers9.push({ flower: Math.floor((Math.random() * 3) + 1) })
    }

    for (let index = 0; index < Math.floor((Math.random() * 2) + 1); index++) {
      this.objectFlowers10.push({ flower: Math.floor((Math.random() * 3) + 1) })
    }

    for (let index = 0; index < Math.floor((Math.random() * 2) + 1); index++) {
      this.objectFlowers11.push({ flower: Math.floor((Math.random() * 3) + 1) })
    }

    for (let index = 0; index < Math.floor((Math.random() * 1) + 1); index++) {
      this.objectFlowers12.push({ flower: Math.floor((Math.random() * 3) + 1) })
    }
  }

}
