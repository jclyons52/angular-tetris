import { Pixel } from './Pixel';

export class Row {
  pixels: Pixel[];
  constructor(public y: number) {
    this.pixels = Array(10)
      .fill(this.y)
      .map((i, x) => new Pixel(x, i));
  }
}
