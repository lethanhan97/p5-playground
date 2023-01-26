import P5 from 'p5';
import { CANVAS_SIZE } from './constants';
import { BaseSketch } from './types';

interface Colors {
  black: P5.Color;
  white: P5.Color;
}

interface GridItem {
  color: P5.Color;
  gridSize: number;
  x: number;
  y: number;
}

export default class CheckeredBoard extends BaseSketch {
  _colors: Colors;
  _grid: GridItem[][] = [];

  readonly GRID_DIMENSION: number = 16;

  constructor({ p5 }: { p5: P5 }) {
    super({ p5, name: 'Checkered Board' });

    this._colors = {
      black: this._p5.color(0, 0, 0),
      white: this._p5.color(256, 256, 256),
    };
  }

  preload = () => {};

  setup = () => {
    this._p5.createCanvas(CANVAS_SIZE, CANVAS_SIZE);
    this.getRectangles();
  };

  getRectangles = () => {
    const gridSize = CANVAS_SIZE / this.GRID_DIMENSION;

    const grid: GridItem[][] = [...Array(this.GRID_DIMENSION)].map((_, i) => {
      // Generate row
      // Every row will have the same y value, starting from 0
      const y = gridSize * i;

      return [...Array(this.GRID_DIMENSION)].map((_, j) => {
        // Generate row item
        // x starts from 0
        const x = gridSize * j;

        return {
          color: (i + j) % 2 === 0 ? this._colors.white : this._colors.black,
          gridSize,
          y,
          x,
        };
      });
    });

    this._grid = grid;
  };

  drawGrid = () => {
    this._grid.forEach((row) => {
      row.forEach((item) => {
        this._p5.fill(item.color);
        this._p5.square(item.x, item.y, item.gridSize);
      });
    });
  };

  draw = () => {
    this.getRectangles();
    this.drawGrid();

    console.log({
      mouseX: this._p5.mouseX,
    });
  };

  remove = () => {};
}
