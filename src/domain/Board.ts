import { Block } from './Block'
import { Row } from './Row'
import { BlockGenerator } from './BlockGenorator'
import { Injectable } from '@angular/core'
import { Limits } from './Limits'
import { Pixel } from './Pixel'

@Injectable({ providedIn: 'root' })
export class Board {
  public currentBlock: Block | undefined
  public rows: Row[]
  constructor(private blockGenerator: BlockGenerator) {
    this.resetRows()
  }

  private get limits(): Limits {
    return {
      y: { upper: this.rows.length - 1, lower: 0 },
      x: { upper: this.rows[0].length - 1, lower: 0 }
    }
  }

  get mergedRows(): Row[] {
    if (!this.currentBlock) {
      return this.rows
    }
    return this.rows.map((row, index) => {
      const ret = row.slice()
      this.currentBlock.pixels.map(p => {
        if (p.y === index) {
          ret[p.x] = p
        }
      })
      return ret
    })
  }

  public resetRows() {
    this.rows = Array(18)
      .fill(0)
      .map((i, y) => Array(10).fill(y).map((j, x) => new Pixel(x, j)))
  }

  public addBlock() {
    this.currentBlock = this.blockGenerator.getBlock(this.limits, this.rows)
  }

  public moveDown(): any {
    if (!this.currentBlock) {
      this.addBlock()
    }
    if (this.currentBlock.canMoveDown()) {
      this.currentBlock.moveDown()
      return true
    }
    if (this.currentBlock.isOverlapping()) {
      return false
    }
    this.currentBlock.add()
    this.addBlock()
  }
}
