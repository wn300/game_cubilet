import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Players } from '../models/general';

@Injectable()
export class GeneralService {
  players: Subject<any> = new Subject<any>();

  constructor() { }

  getPlayersGame(){
    return this.players;
  }

  setPlayersGame(players: Players[]){
    return this.players.next(players);
  }

  getGame(){
    return this.players;
  }

  setGame(players: Players[]){
    return this.players.next(players);
  }

}
