import { Component, OnInit } from '@angular/core';
import { GeneralService } from '../service/general.service';
import { Router } from '@angular/router';
import { Players } from '../models/general';

@Component({
  selector: 'app-sort',
  templateUrl: './sort.component.html',
  styleUrls: ['./sort.component.css']
})
export class SortComponent implements OnInit {
  public players: Players[] = [];
  public player: string = 'jjjj';
  public validate_sort: boolean = false;
  public count_validate: number = 0;

  public viewSecond: boolean = false;
  public viewNext: boolean = false;

  constructor(private shredPlayers: GeneralService, private router: Router) {
    this.shredPlayers.getPlayersGame()
      .subscribe((data: any) => {
        this.players = data;
      })
  }

  ngOnInit() {
  }

  throw(sort: Players) {
    this.count_validate += 1;
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

    sort.sort_number = random;
    sort.sort_position = false;

    if (this.players.length === this.count_validate) {
      this.validate_sort = true;
    } else {
      this.validate_sort = false;
    }
  }

  validate() {
    this.validate_sort = false;
    let numerMax: number = 0;
    this.players.forEach((element) => {
      if (numerMax <= element.sort_number) {
        numerMax = element.sort_number;
      } else {
        element.sort_number = 0;
      }
    })

    let player_filter: any = this.players
      .filter((player: any) => player.sort_number.toString().indexOf(numerMax.toString().toUpperCase()) >= 0);

    this.players.forEach((element) => {
      element.sort_number = 0;
    })

    player_filter
      .forEach((element) => {
        element.sort_position = true;
      })

    if (player_filter.length > 1) {
      this.viewSecond = true;
      this.count_validate -= player_filter.length;
    } else {
      this.viewSecond = false;
      this.viewNext = true;
    }
  }

  next() {
    let players_send: Players[] = [];
    let index_new: number = 19;
    let cont: number = 0;
   
    this.players.forEach((element) => {
      if (cont === 0) {
        if (element.sort_position !== true) {
          index_new += 1;
          element.id = index_new
        } else {
          cont += 1;
          element.id = cont;
        }
      } else {
        cont += 1;
        element.id = cont;
      }
    });

    players_send = this.players.sort(function (a, b) {
      if (a.id > b.id) {
        return 1;
      }
      if (a.id < b.id) {
        return -1;
      }
      return 0;
    });

    document.getElementsByTagName('app-game')[0].className = 'show';
    document.getElementsByTagName('app-sort')[0].className = 'hide';
    this.shredPlayers.setPlayersGame(players_send);
  }
}
