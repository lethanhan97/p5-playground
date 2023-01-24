import P5 from 'p5';

export abstract class BaseSketch {
  _p5: P5;
  _name?: string;

  constructor({ p5, name }: { p5: P5; name?: string }) {
    this._p5 = p5;
    this._name = name;
  }

  abstract preload: () => void;
  abstract setup: () => void;
  abstract draw: () => void;
  abstract remove: () => void;
}
