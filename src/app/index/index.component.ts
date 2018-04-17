import { Component, OnInit } from '@angular/core';
import { Players } from '../models/general';
import { GeneralService } from '../service/general.service';
import { Route } from '@angular/router';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {
  public players: Players[] = [];
  public player: string = '';
  public index: number = 0;

  constructor(private shredPlayers: GeneralService) {
    this.shredPlayers.getGame().subscribe((data:any) => {
      this.players = []
    })
   }

  ngOnInit() {
  }

  addPlayer() {
    this.index += 1;
    this.players.push({ id: this.index, name: this.player, sort_position: false });
    this.player = '';
  }

  startGame() {
    document.getElementsByTagName('app-index')[0].className = 'hide';
    document.getElementsByTagName('app-sort')[0].className = 'show';
    this.shredPlayers.setPlayersGame(this.players);
  }

}
