import { Component, OnInit } from '@angular/core';
import { GeneralService } from '../service/general.service';
import { Router } from '@angular/router';
import { Players, Sort } from '../models/general';

@Component({
  selector: 'app-sort',
  templateUrl: './sort.component.html',
  styleUrls: ['./sort.component.css']
})
export class SortComponent implements OnInit {
  public sort: Sort[] = [];
  public players: Players[] = [];
  public player: string = 'jjjj';

  constructor(private shredPlayers: GeneralService, private router: Router) {
    this.shredPlayers.getPlayersGame()
      .subscribe((data: any) => {
        this.players = data;
        this.sort = data;
      })
  }

  ngOnInit() {
  }

  throw(sort: Sort) {
    let random = Math.floor((Math.random() * (14 - 9 + 1)) + 9);

    switch (random) {
      case 9:
        sort.sort = '9'
        break;
      case 10:
        sort.sort = '10'
        break;
      case 11:
        sort.sort = 'J'
        break;
      case 12:
        sort.sort = 'Q'
        break;
      case 13:
        sort.sort = 'K'
        break;
      case 14:
        sort.sort = 'A'
        break;
    }


  }

}
