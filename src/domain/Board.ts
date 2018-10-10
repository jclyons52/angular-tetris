import { Block } from './Block';
import { Row } from './Row';
import { BlockGenerator } from './BlockGenorator';
import { Injectable } from '@angular/core';

@Injectable()
export class Board {
  public currentBlock: Block | undefined;
  public rows: Row[];
  constructor(private blockGenerator: BlockGenerator) {
    this.resetRows();
  }

  public resetRows() {
    this.rows = Array(18)
      .fill(0)
      .map((i, y) => new Row(y));
  }

  public addBlock() {
    this.currentBlock = this.blockGenerator.getBlock();
  }

  public moveDown(): any {
    if (!this.currentBlock) {
      this.addBlock();
    }
    this.currentBlock.pixels.map(p => (p.y += 1));
  }
}
