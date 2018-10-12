import { Block } from './Block'
import { Pixel } from './Pixel'
import { Injectable } from '@angular/core'
import { Limits } from './Limits'
import { Row } from './Row'

function rand<T>(items: T[]): T {
  return items[randInt(items.length)]
}

function randInt(i: number) {
  return Math.floor(Math.random() * i)
}
@Injectable({ providedIn: 'root' })
export class BlockGenerator {
  public getBlock(limits: Limits, rows: Row[]) {
    return new Block(limits, rows, this.getPixels(), this.getColor())
  }

  private getColor(): string {
    return '#' + Math.floor(Math.random() * 16777215).toString(16)
  }

  private getPixels(): Pixel[] {
    const shapes = [
      [new Pixel(0, 0, true), new Pixel(0, 1, true), new Pixel(1, 0, true), new Pixel(1, 1, true)],
      [new Pixel(0, 0, true), new Pixel(0, 1, true), new Pixel(0, 2, true), new Pixel(0, 3, true)],
      [new Pixel(0, 0, true), new Pixel(0, 1, true), new Pixel(1, 1, true), new Pixel(0, 2, true)],
      [new Pixel(0, 0, true), new Pixel(0, 1, true), new Pixel(1, 2, true), new Pixel(0, 2, true)],
      [new Pixel(0, 0, true), new Pixel(0, 1, true), new Pixel(0, 2, true), new Pixel(1, 0, true)]
    ]
    return rand(shapes)
  }
}
