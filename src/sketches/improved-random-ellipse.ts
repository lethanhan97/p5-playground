import P5 from 'p5';
import { CANVAS_SIZE } from './constants';
import { BaseSketch } from './types';

interface Colors {
  // TODO: Add colors
}

export default class ImprovedRandomEllipse extends BaseSketch {
  _colors: Colors;
  _xOff = 0;
  _yOff = 100;

  constructor({ p5 }: { p5: P5 }) {
    super({ p5, name: 'Improved Random Ellipse with Perlin Noise' });

    this._colors = {
      // TODO: Add colors
    };
  }

  preload = () => {};

  setup = () => {
    this._p5.createCanvas(CANVAS_SIZE, CANVAS_SIZE);
  };

  draw = () => {
    const ELLIPSE_DIAMETER = 50;

    const xNoiseValue = this._p5.noise(this._xOff);
    const yNoiseValue = this._p5.noise(this._yOff);

    const x = this._p5.map(xNoiseValue, 0, 1, 0, CANVAS_SIZE);
    const y = this._p5.map(yNoiseValue, 0, 1, 0, CANVAS_SIZE);

    this._p5.ellipse(x, y, ELLIPSE_DIAMETER, ELLIPSE_DIAMETER);

    this._xOff += 0.01;
    this._yOff += 0.01;
  };

  remove = () => {};
}
