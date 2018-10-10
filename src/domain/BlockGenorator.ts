import { Block } from './Block';
import { Pixel } from './Pixel';
import { Injectable } from '@angular/core';

function rand<T>(items: T[]): T {
  return items[randInt(items.length)];
}

function randInt(i: number) {
  return Math.floor(Math.random() * i);
}
@Injectable({ providedIn: 'root' })
export class BlockGenerator {
  public getBlock() {
    return new Block(this.getPixels(), this.getColor());
  }

  private getColor(): string {
    return '#' + Math.floor(Math.random() * 16777215).toString(16);
  }

  private getPixels(): Pixel[] {
    const shapes = [
      [new Pixel(0, 0), new Pixel(0, 1), new Pixel(1, 0), new Pixel(1, 1)],
      [new Pixel(0, 0), new Pixel(0, 1), new Pixel(0, 2), new Pixel(0, 3)],
      [new Pixel(0, 0), new Pixel(0, 1), new Pixel(1, 1), new Pixel(0, 2)],
      [new Pixel(0, 0), new Pixel(0, 1), new Pixel(1, 2), new Pixel(0, 2)],
      [new Pixel(0, 0), new Pixel(0, 1), new Pixel(0, 2), new Pixel(1, 0)]
    ];
    return rand(shapes);
  }
}
