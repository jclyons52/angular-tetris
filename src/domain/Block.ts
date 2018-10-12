import { Pixel } from './Pixel'
import { Limits } from './Limits'
import { Row } from './Row'

export class Block {
  constructor(
    private limits: Limits,
    private rows: Row[],
    public pixels: Pixel[],
    public color: string
  ) {}

  add = () => {
    this.pixels.map(p => {
      const pixel = this.rows[p.y][p.x]
      pixel.filled = true
    })
  }

  rotate = () => {
    const relative = locToArr(this.pixels[1])
    const newPiece: Pixel[] = this.pixels.map((loc: Pixel) => {
      const arr: [number, number] = diff(locToArr(loc), relative)
      const rotated: [number, number] = [-1 * arr[1], 1 * arr[0]]
      const n = sum(rotated, relative)
      loc.x = n[0]
      loc.y = n[1]
      return loc
    })

    const getRequiredShifts = bounds => {
      return {
        x: (() => {
          if (bounds.x.max > this.limits.x.upper) {
            return this.limits.x.upper - bounds.x.max
          }
          if (bounds.x.min < this.limits.x.lower) {
            return -bounds.x.min
          }
          return 0
        })(),
        y: (() => {
          if (bounds.y.max > this.limits.y.upper) {
            return this.limits.y.upper - bounds.y.max
          }
          if (bounds.y.min < this.limits.y.lower) {
            return -bounds.y.min
          }
          return 0
        })()
      }
    }

    function getBounds(p) {
      return {
        x: {
          max: Math.max(...p.map(({ x }) => x)),
          min: Math.min(...p.map(({ x }) => x))
        },
        y: {
          max: Math.max(...p.map(({ y }) => y)),
          min: Math.min(...p.map(({ y }) => y))
        }
      }
    }

    function locToArr({ x, y }: Pixel): [number, number] {
      return [x, y]
    }

    function diff([x1, y1], [x2, y2]): [number, number] {
      return [x1 - x2, y1 - y2]
    }

    function sum([x1, y1], [x2, y2]) {
      return [x1 + x2, y1 + y2]
    }

    const shift = (() => {
      const bounds = getBounds(newPiece)
      return getRequiredShifts(bounds)
    })()

    const pieces = newPiece.map(p => {
      p.x += shift.x
      p.y += shift.y
      return p
    })
    this.pixels = pieces
  }

  moveDown = () => {
    if (!this.atBottomLimit()) {
      this.pixels.map(p => (p.y += 1))
    }
  }

  moveLeft = () => {
    if (this.canMoveLeft()) {
      this.pixels.map(p => (p.x -= 1))
    }
  }

  moveRight = () => {
    if (this.canMoveRight()) {
      this.pixels.map(p => (p.x += 1))
    }
  }

  atLeftLimit = (point: Pixel | undefined): boolean => {
    if (point) {
      return point.x === this.limits.x.lower
    }
    return this.pixels.filter(({ x }) => x === this.limits.x.lower).length > 0
  }

  atRightLimit = (point: Pixel | undefined): boolean => {
    if (point) {
      return point.x === this.limits.x.upper
    }
    return this.pixels.filter(({ x }) => x === this.limits.x.upper).length > 0
  }

  atTopLimit = (point: Pixel | undefined): boolean => {
    if (point) {
      return point.y === this.limits.y.lower
    }
    return this.pixels.filter(({ y }) => y === this.limits.y.lower).length > 0
  }

  overTopLimit = (point: Pixel | undefined): boolean => {
    if (point) {
      return point.y > this.limits.y.upper
    }
    return this.pixels.filter(({ y }) => y > this.limits.y.upper).length > 0
  }

  atBottomLimit = (): boolean => {
    return this.pixels.filter(({ y }) => y === this.limits.y.upper).length > 0
  }

  isFull = (row: Row): boolean => {
    return row.filter(i => !i.filled).length === 0
  }

  isOverlapping = (): boolean => {
    return (
      this.pixels.filter(({ x, y }) => {
        if (y > this.rows.length) {
          return false
        }
        if (x > this.rows[y].length) {
          return false
        }
        return this.rows[y][x].filled
      }).length > 0
    )
  }

  canMoveDown = (): boolean => {
    return (
      this.pixels.filter(({ x, y }) => {
        if (y === this.limits.y.upper) {
          return true
        }
        if (this.rows[y + 1][x].filled) {
          return true
        }
        return false
      }).length === 0
    )
  }

  canMoveLeft = (): boolean => {
    return (
      this.pixels.filter(({ x, y }) => {
        if (x === this.limits.x.lower) {
          return true
        }
        if (this.rows[y][x - 1].filled) {
          return true
        }
        return false
      }).length === 0
    )
  }

  canMoveRight = (): boolean => {
    return (
      this.pixels.filter(({ x, y }) => {
        if (x === this.limits.x.upper) {
          return true
        }
        if (this.rows[y][x + 1].filled) {
          return true
        }
        return false
      }).length === 0
    )
  }
}
