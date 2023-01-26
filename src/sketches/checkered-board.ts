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
  _gridCache: Map<number, GridItem[][]> = new Map();

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
  };

  getGrid = (dimension: number) => {
    const gridSize = CANVAS_SIZE / dimension;

    const grid: GridItem[][] = [...Array(dimension)].map((_, i) => {
      // Generate row
      // Every row will have the same y value, starting from 0
      const y = gridSize * i;

      return [...Array(dimension)].map((_, j) => {
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

    return grid;
  };

  drawGrid = (grid: GridItem[][]) => {
    grid.forEach((row) => {
      row.forEach((item) => {
        this._p5.fill(item.color);
        this._p5.square(item.x, item.y, item.gridSize);
      });
    });
  };

  getDimension = () => {
    return Math.max(Math.floor(this._p5.mouseX / 100), 1);
  };

  draw = () => {
    const dimension = this.getDimension();

    const grid =
      this._gridCache.get(dimension) ||
      (() => {
        const _grid = this.getGrid(dimension);
        this._gridCache.set(dimension, _grid);

        return _grid;
      })();

    this.drawGrid(grid);
  };

  remove = () => {};
}
