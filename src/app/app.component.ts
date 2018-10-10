import { Component } from '@angular/core';
import { Game } from '../domain/Game';
import { Board } from '../domain/Board';
import { BlockGenerator } from '../domain/BlockGenorator';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  game: Game;
  constructor(game: Game) {
    this.game = game;
  }
}
