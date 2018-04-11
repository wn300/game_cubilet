import { Component, OnInit } from '@angular/core';
import { GeneralService } from '../service/general.service';
import { Players, Game } from '../models/general';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {
  public players: Players[] = [];
  public turn_player: Players = { id: 0, name: '' };

  public games: Game[] = [];

  public cube_one: string = '9';
  public cube_two: string = '10';
  public cube_three: string = 'J';
  public cube_four: string = 'Q';
  public cube_five: string = 'K';

  public class_one: string = 'cube nine';
  public class_two: string = 'cube then'
  public class_three: string = 'cube j'
  public class_four: string = 'cube q'
  public class_five: string = 'cube k'

  public launch: boolean = true;
  public show: boolean = false;

  public count_turns: number = 1;
  public count_player: number = 0;
  public count_general: number = 0;
  public count_by_player: number = null;
  public count_selection: number = null;

  constructor(private shredPlayers: GeneralService, private router: Router) {
    this.shredPlayers.getPlayersGame()
      .subscribe((data: any) => {
        this.players = data;
        this.turn_player = this.players[0];
      })
  }

  ngOnInit() {
    this.count_player = 0;
    this.count_general = 0;
    this.count_by_player = null;
    this.count_selection = null;
    this.launch = true;
    this.show = false;
    if (this.players.length > 0) {
      this.turn_player = this.players[0];
    }
  }

  start() {
    this.count_by_player = 1;
    this.count_selection = 0;

    this.random();

    this.show = true;
    this.launch = false;
  }

  clear(event: boolean, points_acumulates: number, moviments_acumulates: number) {
    this.show = false;
    this.launch = true;

    this.games
      .filter((game: any) => game.turn.toUpperCase().indexOf(this.count_turns.toString().toUpperCase()) >= 0)
      .forEach((element) => {
        if (this.games[this.games.length - 1].player_id !== element.player_id) {
          if (element.point > 0) {
            if (element.point < points_acumulates) {
              element.point = 0;
            } else {
              if (element.move !== moviments_acumulates) {
                if (element.move < moviments_acumulates) {
                  element.point = 0;
                } else {
                  this.games[this.games.length - 1].point = 0;
                }
              } else {
                this.games[this.games.length - 1].point = 0;
              }
            }
          }
        }
      })

   
    for (var i = 0; i < this.players.length; i++) {
      let sum_points: number = 0;
      this.games
        .filter((game: any) => game.player_id.toString().toUpperCase().indexOf(this.players[i].id.toString().toUpperCase()) >= 0)
        .forEach((element) => {
          sum_points += element.point;
        })
      if (sum_points >= 10) {
        if (!confirm('Juego teminado gana el jugador: ' + this.players[i].name + ' con ' + sum_points + ' puntos.')) {
          this.finishedGame();
        } else {
          this.finishedGame();
        }
      }
    }

    this.count_by_player = 0;

    this.count_player += 1;

    if (event) {
      if (this.players.length > this.count_player) {
        this.turn_player = this.players[this.count_player];
      } else {
        if (!confirm('Partida terminada comienza la siguiente ronda')) {
          this.count_turns += 1;
          this.ngOnInit()
        } else {
          this.count_turns += 1;
          this.ngOnInit()
        }
      }
    } else {
      this.count_turns += 1;
      this.ngOnInit()
    }

  }

  restart() {
    if (this.count_general > 0) {
      if (this.count_general === this.count_by_player) {
        if (!confirm('Ya supero los ' + this.count_general + ' intentos posibles de click en ok o cancelar')) { this.continue(); } else { this.continue(); }
      }
    }
    this.count_by_player += 1;
    this.random();
  }

  selection() {
    if (this.count_selection < 3) {
      if (this.count_general > 0) {
        if (this.count_general === this.count_by_player) {
          if (!confirm('Ya supero los ' + this.count_general + ' intentos posibles de click en ok o cancelar')) { this.continue(); } else { this.continue(); }
        }
      }
      this.count_by_player += 1;
      this.count_selection += 1;
    } else {
      if (!confirm('Ya supero los 3 intentos posibles de click en ok o cancelar')) { this.continue(); } else { this.continue(); }
    }
  }

  finishedGame() {
    this.players = [];
    this.turn_player[0] = { id: 0, name: '' };

    this.games = [];

    this.class_five = 'cube k'

    this.launch = true;
    this.show = false;

    this.count_turns = 1;
    this.count_player = 0;
    this.count_general = 0;
    this.count_by_player = null;
    this.count_selection = null;

    document.getElementsByTagName('app-index')[0].className = 'show';
    document.getElementsByTagName('app-game')[0].className = 'hide';
    this.shredPlayers.setGame([]);
  }

  continue() {
    let one: number = 0;
    let two: number = 0;
    let three: number = 0;
    let four: number = 0;
    let five: number = 0;
    let points_acumulates: number = 0;
    let moviments_acumulates: number = 0;

    if (this.count_general === 0) {
      this.count_general = this.count_by_player;
    }

    //CARABIMA DE A
    if (this.cube_one === 'A' && this.cube_two === 'A' && this.cube_three === 'A' && this.cube_four === 'A' && this.cube_five === 'A') {
      if (!confirm('El jugador ' + this.turn_player.name + ' tiene carabina de As y gana el juego.')) {
        this.finishedGame();
      } else {
        this.finishedGame();
      }
    } else {
      //cube one
      switch (this.cube_one) {
        case '9':
          one = 1;
          break;
        case '10':
          one = 2;
          break;
        case 'J':
          one = 11;
          break;
        case 'Q':
          one = 11;
          break;
        case 'K':
          one = 11;
          break;
        case 'A':
          if (this.cube_two != '9' && this.cube_two != '10') {
            one = 12;
            break;
          } else {
            one = this.cube_two == '9' ? 1 : 2;
          }
          if (this.cube_three != '9' && this.cube_three != '10') {
            one = 12;
            break;
          } else {
            one = this.cube_three == '9' ? 1 : 2;
          }
          if (this.cube_four != '9' && this.cube_four != '10') {
            one = 12;
            break;
          } else {
            one = this.cube_four == '9' ? 1 : 2;
          }
          if (this.cube_five != '9' && this.cube_five != '10') {
            one = 12;
            break;
          } else {
            one = this.cube_five == '9' ? 1 : 2;
          }
          break;
      }
      //cube two
      switch (this.cube_two) {
        case '9':
          two = 1;
          break;
        case '10':
          two = 2;
          break;
        case 'J':
          two = 11;
          break;
        case 'Q':
          two = 11;
          break;
        case 'K':
          two = 11;
          break;
        case 'A':
          if (this.cube_one != '9' && this.cube_one != '10') {
            two = 12;
            break;
          } else {
            two = this.cube_one == '9' ? 1 : 2;
          }
          if (this.cube_three != '9' && this.cube_three != '10') {
            two = 12;
            break;
          } else {
            two = this.cube_three == '9' ? 1 : 2;
          }
          if (this.cube_four != '9' && this.cube_four != '10') {
            two = 12;
            break;
          } else {
            two = this.cube_four == '9' ? 1 : 2;
          }
          if (this.cube_five != '9' && this.cube_five != '10') {
            two = 12;
            break;
          } else {
            two = this.cube_five == '9' ? 1 : 2;
          }
          break;
      }
      //cube three
      switch (this.cube_three) {
        case '9':
          three = 1;
          break;
        case '10':
          three = 2;
          break;
        case 'J':
          three = 11;
          break;
        case 'Q':
          three = 11;
          break;
        case 'K':
          three = 11;
          break;
        case 'A':
          if (this.cube_one != '9' && this.cube_one != '10') {
            three = 12;
            break;
          } else {
            three = this.cube_one == '9' ? 1 : 2;
          }
          if (this.cube_two != '9' && this.cube_two != '10') {
            three = 12;
            break;
          } else {
            three = this.cube_two == '9' ? 1 : 2;
          }
          if (this.cube_four != '9' && this.cube_four != '10') {
            three = 12;
            break;
          } else {
            three = this.cube_four == '9' ? 1 : 2;
          }
          if (this.cube_five != '9' && this.cube_five != '10') {
            three = 12;
            break;
          } else {
            three = this.cube_five == '9' ? 1 : 2;
          }
          break;
      }
      //cube four
      switch (this.cube_four) {
        case '9':
          four = 1;
          break;
        case '10':
          four = 2;
          break;
        case 'J':
          four = 11;
          break;
        case 'Q':
          four = 11;
          break;
        case 'K':
          four = 11;
          break;
        case 'A':
          if (this.cube_one != '9' && this.cube_one != '10') {
            four = 12;
            break;
          } else {
            four = this.cube_one == '9' ? 1 : 2;
          }
          if (this.cube_two != '9' && this.cube_two != '10') {
            four = 12;
            break;
          } else {
            four = this.cube_two == '9' ? 1 : 2;
          }
          if (this.cube_three != '9' && this.cube_three != '10') {
            four = 12;
            break;
          } else {
            four = this.cube_three == '9' ? 1 : 2;
          }
          if (this.cube_five != '9' && this.cube_five != '10') {
            four = 12;
            break;
          } else {
            four = this.cube_five == '9' ? 1 : 2;
          }
          break;
      }
      //cube five
      switch (this.cube_five) {
        case '9':
          five = 1;
          break;
        case '10':
          five = 2;
          break;
        case 'J':
          five = 11;
          break;
        case 'Q':
          five = 11;
          break;
        case 'K':
          five = 11;
          break;
        case 'A':
          if (this.cube_one != '9' && this.cube_one != '10') {
            five = 12;
            break;
          } else {
            five = this.cube_one == '9' ? 1 : 2;
          }
          if (this.cube_two != '9' && this.cube_two != '10') {
            five = 12;
            break;
          } else {
            five = this.cube_two == '9' ? 1 : 2;
          }
          if (this.cube_three != '9' && this.cube_three != '10') {
            five = 12;
            break;
          } else {
            five = this.cube_three == '9' ? 1 : 2;
          }
          if (this.cube_four != '9' && this.cube_four != '10') {
            five = 12;
            break;
          } else {
            five = this.cube_four == '9' ? 1 : 2;
          }
          break;
      }

      let sum = one + two + three + four + five;

      if (sum === 55) {
        this.carabinaReyesLimpia(points_acumulates, sum);
      } else {
        one = one == 12 ? 11 : one == 1 ? 7 : one == 2 ? 8 : one;
        two = two == 12 ? 11 : two == 1 ? 7 : two == 2 ? 8 : two;
        three = three == 12 ? 11 : three == 1 ? 7 : three == 2 ? 8 : three;
        four = four == 12 ? 11 : four == 1 ? 7 : four == 2 ? 8 : four;
        five = five == 12 ? 11 : five == 1 ? 7 : five == 2 ? 8 : five;
        moviments_acumulates = one + two + three + four + five;
        if (sum > 55) {
          this.carabinaReyesSucia(points_acumulates, moviments_acumulates);
        } else {
          this.sinCarabina(points_acumulates, moviments_acumulates);
        }
      }
    }
  }

  random() {
    let random_one = Math.floor((Math.random() * (14 - 9 + 1)) + 9);
    let random_two = Math.floor((Math.random() * (14 - 9 + 1)) + 9);
    let random_three = Math.floor((Math.random() * (14 - 9 + 1)) + 9);
    let random_four = Math.floor((Math.random() * (14 - 9 + 1)) + 9);
    let random_five = Math.floor((Math.random() * (14 - 9 + 1)) + 9);

    switch (random_one) {
      case 9:
        this.cube_one = '9'
        this.class_one = 'cube nine';
        break;
      case 10:
        this.cube_one = '10'
        this.class_one = 'cube then';
        break;
      case 11:
        this.cube_one = 'J'
        this.class_one = 'cube j';
        break;
      case 12:
        this.cube_one = 'Q'
        this.class_one = 'cube q';
        break;
      case 13:
        this.cube_one = 'K'
        this.class_one = 'cube k';
        break;
      case 14:
        this.cube_one = 'A'
        this.class_one = 'cube a';
        break;
    }

    switch (random_two) {
      case 9:
        this.cube_two = '9'
        this.class_two = 'cube nine';
        break;
      case 10:
        this.cube_two = '10'
        this.class_two = 'cube then';
        break;
      case 11:
        this.cube_two = 'J'
        this.class_two = 'cube j';
        break;
      case 12:
        this.cube_two = 'Q'
        this.class_two = 'cube q';
        break;
      case 13:
        this.cube_two = 'K'
        this.class_two = 'cube k';
        break;
      case 14:
        this.cube_two = 'A'
        this.class_two = 'cube a';
        break;
    }

    switch (random_three) {
      case 9:
        this.cube_three = '9'
        this.class_three = 'cube nine';
        break;
      case 10:
        this.cube_three = '10'
        this.class_three = 'cube then';
        break;
      case 11:
        this.cube_three = 'J'
        this.class_three = 'cube j';
        break;
      case 12:
        this.cube_three = 'Q'
        this.class_three = 'cube q';
        break;
      case 13:
        this.cube_three = 'K'
        this.class_three = 'cube k';
        break;
      case 14:
        this.cube_three = 'A'
        this.class_three = 'cube a';
        break;
    }

    switch (random_four) {
      case 9:
        this.cube_four = '9'
        this.class_four = 'cube nine';
        break;
      case 10:
        this.cube_four = '10'
        this.class_four = 'cube then';
        break;
      case 11:
        this.cube_four = 'J'
        this.class_four = 'cube j';
        break;
      case 12:
        this.cube_four = 'Q'
        this.class_four = 'cube q';
        break;
      case 13:
        this.cube_four = 'K'
        this.class_four = 'cube k';
        break;
      case 14:
        this.cube_four = 'A'
        this.class_four = 'cube a';
        break;
    }

    switch (random_five) {
      case 9:
        this.cube_five = '9'
        this.class_five = 'cube nine';
        break;
      case 10:
        this.cube_five = '10'
        this.class_five = 'cube then';
        break;
      case 11:
        this.cube_five = 'J'
        this.class_five = 'cube j';
        break;
      case 12:
        this.cube_five = 'Q'
        this.class_five = 'cube q';
        break;
      case 13:
        this.cube_five = 'K'
        this.class_five = 'cube k';
        break;
      case 14:
        this.cube_five = 'A'
        this.class_five = 'cube a';
        break;
    }
  }

  carabinaReyesLimpia(points_acumulates: number, moviments_acumulates: number) {
    if (!confirm('El jugador ' + this.turn_player.name + ' tiene carabina de reyes (natural) obtiene 5 puntos y acaba la ronda.')) {
      points_acumulates = 5

      this.games.push({
        player_id: this.players[this.count_player].id,
        player_name: this.players[this.count_player].name,
        cube_one: this.cube_one,
        cube_two: this.cube_two,
        cube_three: this.cube_three,
        cube_four: this.cube_four,
        cube_five: this.cube_five,
        move: moviments_acumulates,
        point: points_acumulates,
        winner: false,
        turn: this.count_turns.toString(),
      })

      this.clear(false, points_acumulates, moviments_acumulates);
    } else {
      points_acumulates = 5

      this.games.push({
        player_id: this.players[this.count_player].id,
        player_name: this.players[this.count_player].name,
        cube_one: this.cube_one,
        cube_two: this.cube_two,
        cube_three: this.cube_three,
        cube_four: this.cube_four,
        cube_five: this.cube_five,
        move: moviments_acumulates,
        point: points_acumulates,
        winner: false,
        turn: this.count_turns.toString(),
      })

      this.clear(false, points_acumulates, moviments_acumulates);
    }
  }

  carabinaReyesSucia(points_acumulates: number, moviments_acumulates: number) {
    if (!confirm('El jugador ' + this.turn_player.name + ' tiene carabina de reyes (sucia) obtiene 2 puntos y acaba la ronda.')) {
      points_acumulates = 2

      this.games.push({
        player_id: this.players[this.count_player].id,
        player_name: this.players[this.count_player].name,
        cube_one: this.cube_one,
        cube_two: this.cube_two,
        cube_three: this.cube_three,
        cube_four: this.cube_four,
        cube_five: this.cube_five,
        move: moviments_acumulates,
        point: points_acumulates,
        winner: false,
        turn: this.count_turns.toString(),
      })

      this.clear(false, points_acumulates, moviments_acumulates);
    } else {
      points_acumulates = 2

      this.games.push({
        player_id: this.players[this.count_player].id,
        player_name: this.players[this.count_player].name,
        cube_one: this.cube_one,
        cube_two: this.cube_two,
        cube_three: this.cube_three,
        cube_four: this.cube_four,
        cube_five: this.cube_five,
        move: moviments_acumulates,
        point: points_acumulates,
        winner: false,
        turn: this.count_turns.toString(),
      })

      this.clear(false, points_acumulates, moviments_acumulates);
    }
  }

  sinCarabina(points_acumulates: number, moviments_acumulates: number) {
    points_acumulates = 1
    this.games.push({
      player_id: this.players[this.count_player].id,
      player_name: this.players[this.count_player].name,
      cube_one: this.cube_one,
      cube_two: this.cube_two,
      cube_three: this.cube_three,
      cube_four: this.cube_four,
      cube_five: this.cube_five,
      move: moviments_acumulates,
      point: points_acumulates,
      winner: false,
      turn: this.count_turns.toString(),
    })

    this.clear(true, points_acumulates, moviments_acumulates);
  }
}



