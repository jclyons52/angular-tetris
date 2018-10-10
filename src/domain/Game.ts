import { GameState } from './GameState';
import { Board } from './Board';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class Game {
    public state: GameState = GameState.Inactive;
    public score = 0;

    constructor(public board: Board) {
    }

    public start() {
      this.state = GameState.Active;
      this.score = 0;
      this.board.resetRows();
      setInterval(() => this.moveDown(), 1000);
    }

    public pause() {
      this.state = GameState.Paused;
    }

    public unPause() {
      this.state = GameState.Active;
    }

    private moveDown() {
        if (this.state !== GameState.Active) {
            return;
        }
        this.board.moveDown();
    }
  }
