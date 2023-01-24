import P5 from 'p5';
import { CANVAS_SIZE } from './constants';
import { BaseSketch } from './types';

interface Colors {
  // TODO: Add colors
}

export default class Cubes extends BaseSketch {
  _colors: Colors;

  constructor({ p5 }: { p5: P5 }) {
    super({ p5, name: 'Cubes' });

    this._colors = {
      // TODO: Add colors
    };
  }

  preload = () => {};

  setup = () => {
    this._p5.createCanvas(CANVAS_SIZE, CANVAS_SIZE, this._p5.WEBGL);
  };

  draw = () => {
    this._p5.background(0);
    this._p5.orbitControl();

    this._p5.lights();

    this._p5.translate(-240, -100, 0);
    this._p5.rotateX(this._p5.mouseY / 100);
    this._p5.rotateY(this._p5.mouseX / 100);
    this._p5.box(100, 100);

    this._p5.translate(240, 0, 0);
    this._p5.rotateX(this._p5.mouseY / 1000);
    this._p5.rotateY(this._p5.mouseX / 1000);
    this._p5.box(100);
  };

  remove = () => {};
}
