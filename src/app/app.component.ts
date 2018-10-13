import { Component, HostListener } from '@angular/core'
import { Game } from '../domain/Game'
import { Link } from 'src/domain/Link'

const leftArrow = 37
const upArrow = 38
const rightArrow = 39
const downArrow = 40

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

  @HostListener('window:keydown', ['$event'])
  onKeyDown(event) {
    event.preventDefault()
    switch (event.keyCode) {
      case leftArrow:  return this.game.moveBlockLeft()
      case rightArrow: return this.game.moveBlockRight()
      case upArrow:    return this.game.rotateBlock()
      case downArrow:  return this.game.moveDown()
      default:         return
    }
  }
}
