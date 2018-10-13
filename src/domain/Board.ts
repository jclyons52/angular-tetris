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

  private get limits(): Limits {
    return {
      y: { upper: this.rows.length - 1, lower: 0 },
      x: { upper: this.rows[0].length - 1, lower: 0 }
    }
  }

  public moveDown(): [boolean, number] {
    if (!this.currentBlock) {
      this.addBlock()
    }
    if (this.currentBlock.canMoveDown()) {
      this.currentBlock.moveDown()
      return [true, 0]
    }
    if (this.currentBlock.isOverlapping()) {
      return [false, 0]
    }
    this.currentBlock.add()
    const score = this.clearfilled()
    this.addBlock()
    return [true, score]
  }

  private clearfilled(): number {
    const rows = this.rows.filter(row => {
      return row.filter(pix => !pix.filled).length > 0
    })
    const score = this.rows.length - rows.length
    const blanks = this.addRows(score)
    this.rows = [ ...blanks, ...rows]
    return score
  }

  public resetRows() {
    this.rows = this.addRows(18)
  }

  private addRows(count: number): Row[] {
    return Array(count)
      .fill(0)
      .map((i, y) => this.addRow(y))
  }

  private addRow(y: number): Row {
    return  Array(10).fill(y).map((j, x) => new Pixel(x, j))
  }

  private addBlock() {
    this.currentBlock = this.blockGenerator.getBlock(this.limits, this.rows)
  }
}
