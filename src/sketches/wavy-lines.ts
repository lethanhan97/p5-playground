import P5 from 'p5';
import { CANVAS_SIZE } from './constants';
import { BaseSketch } from './types';

interface Colors {
  black: P5.Color;
  white: P5.Color;
}

export default class WavyLines extends BaseSketch {
  readonly LINE_COUNT = 50;

  _colors: Colors;
  _stepArr = [...Array(this.LINE_COUNT)].map(() => 0.0005);
  _offsetArr = [...Array(this.LINE_COUNT)].map(() => 0);

  constructor({ p5 }: { p5: P5 }) {
    super({ p5, name: 'Wavy Lines with 1D Perlin Noise' });

    this._colors = {
      // TODO: Add colors
      black: this._p5.color(0, 0, 0),
      white: this._p5.color(256, 256, 256),
    };
  }

  preload = () => {};

  setup = () => {
    this._p5.noiseSeed(100);
    this._p5.createCanvas(CANVAS_SIZE, CANVAS_SIZE);
  };

  drawHorizontalLines = ({
    baseY,
    linePos,
  }: {
    baseY: number;
    linePos: number;
  }) => {
    let offset = this._offsetArr[linePos];
    const step = this._stepArr[linePos];

    this._p5.beginShape();

    this._p5.noFill();
    [...Array(CANVAS_SIZE)].forEach((_, x) => {
      const noise = this._p5.noise(offset);
      const y = baseY * noise;

      this._p5.vertex(x, y);

      offset += step;
    });

    this._offsetArr[linePos] += step;
    this._p5.endShape();
  };

  drawVerticalLines = ({
    baseX,
    linePos,
  }: {
    baseX: number;
    linePos: number;
  }) => {
    let offset = this._offsetArr[linePos];
    const step = this._stepArr[linePos];

    this._p5.beginShape();

    this._p5.noFill();
    [...Array(CANVAS_SIZE)].forEach((_, y) => {
      const noise = this._p5.noise(offset);
      const x = baseX * noise;

      this._p5.vertex(x, y);

      offset += step;
    });

    this._offsetArr[linePos] += step;
    this._p5.endShape();
  };

  draw = () => {
    this._p5.background(this._colors.black);

    this._p5.stroke(this._colors.white);
    [...Array(this.LINE_COUNT)].forEach((_, i) => {
      const base = (CANVAS_SIZE / this.LINE_COUNT) * i * 4;

      this.drawHorizontalLines({ baseY: base, linePos: i });
      this.drawVerticalLines({ baseX: base, linePos: i });
    });

    // this._p5.noLoop();
  };

  remove = () => {};
}
