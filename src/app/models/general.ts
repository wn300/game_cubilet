export interface Players {
    id: number,
    name: string
}

export interface Game {
    turn: string,
    player_id: number,
    player_name: string
    cube_one: string,
    cube_two: string,
    cube_three: string,
    cube_four: string,
    cube_five: string,
    move: number,
    point: number,
    winner: boolean
}
