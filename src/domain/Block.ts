import { Pixel } from './Pixel'
import { Limits } from './Limits'
import { Row } from './Row'

function getBounds(p): Limits {
  return {
    x: {
      upper: Math.max(...p.map(({ x }) => x)),
      lower: Math.min(...p.map(({ x }) => x))
    },
    y: {
      upper: Math.max(...p.map(({ y }) => y)),
      lower: Math.min(...p.map(({ y }) => y))
    }
  }
}

class PositionDelta {
  constructor(public x: number, public y: number) {}
}

function getAxisLimit (bounds: Limits, limits: Limits, axis: 'x' | 'y') {
  if (bounds[axis].upper > limits[axis].upper) {
    return limits[axis].upper - bounds[axis].upper
  }
  if (bounds[axis].lower < limits[axis].lower) {
    return -bounds[axis].lower
  }
  return 0
}


const getRequiredShifts = (bounds: Limits, limits: Limits): PositionDelta => {
  return {
    x: getAxisLimit(bounds, limits, 'x'),
    y: getAxisLimit(bounds, limits, 'y')
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

export class Block {

  atBottomLimit = this.atLimit('y', 'upper')

  canMoveDown = this.canMove('y', 'upper')

  private canMoveLeft = this.canMove('x', 'lower')

  private canMoveRight = this.canMove('x', 'upper')

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

    const shift = (() => {
      const bounds = getBounds(newPiece)
      return getRequiredShifts(bounds, this.limits)
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

  private atLimit(axis: 'x' | 'y', bound: 'upper' | 'lower') {
    return (): boolean => {
      return this.pixels.filter((pixel) => pixel[axis] === this.limits[axis][bound]).length > 0
    }
  }

  private canMove(axis: 'x' | 'y', bound: 'upper' | 'lower') {
    return (): boolean => {
      return (
        this.pixels.filter((pixel) => {
          if (pixel[axis] === this.limits[axis][bound]) {
            return true
          }
          const rowLocation = { ...pixel }
          rowLocation[axis] += 1
          if (this.rows[rowLocation.y][rowLocation.x].filled) {
            return true
          }
          return false
        }).length === 0
      )
    }
  }
}
