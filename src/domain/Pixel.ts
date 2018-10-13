
const tile = {
  full: '■',
  empty: '□'
}

export class Pixel {

  get icon() {
    return this.filled ? tile.full : tile.empty
  }

  constructor(
    public x: number,
    public y: number,
    public filled: boolean = false
  ) {}
}
