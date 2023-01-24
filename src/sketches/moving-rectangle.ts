import P5 from 'p5';
import { CANVAS_SIZE } from './constants';
import { BaseSketch } from './types';

interface Colors {
  black: P5.Color;
  white: P5.Color;
}

export default class MovingRectangle extends BaseSketch {
  _colors: Colors;

  constructor({ p5 }: { p5: P5 }) {
    super({ p5, name: 'Moving Rectangle' });

    this._colors = {
      black: p5.color(0, 0, 0),
      white: p5.color(256, 256, 256),
    };
  }

  getWidth() {
    const maxWidth = CANVAS_SIZE / 2;

    if (this._p5.mouseX > maxWidth) return 2 * maxWidth - this._p5.mouseX;

    return this._p5.mouseX;
  }

  getHeight({ width }: { width: number }) {
    return width * 2;
  }

  preload = () => {};

  setup = () => {
    this._p5.createCanvas(CANVAS_SIZE, CANVAS_SIZE);
    this._p5.rectMode(this._p5.CENTER);
    this._p5.noStroke();
  };

  draw = () => {
    this._p5.background(this._colors.black);

    const w = this.getWidth();
    const h = this.getHeight({ width: w });
    const color = this._p5.map(w, 0, CANVAS_SIZE / 2, 0, 256);
    this._p5.fill(color);
    this._p5.rect(CANVAS_SIZE / 4, CANVAS_SIZE / 2, w, h);

    const w2 = Math.min(CANVAS_SIZE / 2 - w, CANVAS_SIZE / 2);
    const h2 = this.getHeight({ width: w2 });
    const color2 = this._p5.map(w2, 0, CANVAS_SIZE / 2, 0, 256);
    this._p5.fill(color2);
    this._p5.rect((CANVAS_SIZE * 3) / 4, CANVAS_SIZE / 2, w2, h2);
  };

  remove = () => {};
}
