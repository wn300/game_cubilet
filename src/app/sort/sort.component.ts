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

  constructor(private shredPlayers: GeneralService, private router: Router) {
    this.shredPlayers.getPlayersGame()
      .subscribe((data: any) => {
        this.players = data;
      })
  }

  ngOnInit() {
  }

}
