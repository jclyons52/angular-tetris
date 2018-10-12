import { Component } from '@angular/core';
import { Game } from '../domain/Game';
import { Link } from 'src/domain/Link';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  game: Game

  links = [
    new Link('#', 'Features'),
    new Link('#', 'Enterprise'),
    new Link('#', 'Support'),
    new Link('#', 'Pricing'),
  ]

  constructor(game: Game) {
    this.game = game
  }
}
