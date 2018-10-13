import { GameState } from './GameState'
import { Board } from './Board'
import { Injectable } from '@angular/core'

@Injectable({ providedIn: 'root' })
export class Game {
    public state: GameState = GameState.Inactive
    public score = 0
    public loop: NodeJS.Timer

    constructor(private board: Board) {
    }

    public isInactive = () => this.state === GameState.Inactive
    public isActive = () => this.state === GameState.Active
    public isPaused = () => this.state === GameState.Paused
    public isOver = () => this.state === GameState.GameOver

    public moveBlockLeft = () => this.board.currentBlock.moveLeft()
    public moveBlockRight = () => this.board.currentBlock.moveRight()
    public rotateBlock = () => this.board.currentBlock.rotate()

    public start() {
      this.state = GameState.Active
      this.score = 0
      this.board.resetRows()
      if (!this.loop) {
        this.loop = setInterval(() => this.moveDown(), 1000)
      }
    }

    public pause() {
      this.state = GameState.Paused
      clearInterval(this.loop)
    }

    public unPause() {
      this.state = GameState.Active
      this.loop = setInterval(() => this.moveDown(), 1000)
    }

    public moveDown() {
        if (this.state !== GameState.Active) {
            return
        }
        const [result, score] = this.board.moveDown()
        this.score += score
        if (!result) {
          this.state = GameState.GameOver
        }
    }
  }
