import P5 from "p5";
import { CANVAS_SIZE } from "./constants";
import { BaseSketch } from "./types";

interface Colors {
  blue: P5.Color;
  darkRed: P5.Color;
  darkGreen: P5.Color;
}

export default class RandomEllipse extends BaseSketch {
  _colors: Colors;

  readonly ATTRIBUTE_VALUES = {
    // Start in the middle
    x: CANVAS_SIZE / 2,
    y: CANVAS_SIZE / 2,

    width: 50,
    height: 50,
  };
  readonly MAX = {
    x: CANVAS_SIZE,
    y: CANVAS_SIZE,
    width: CANVAS_SIZE / 2,
    height: CANVAS_SIZE / 2,
  };

  readonly MIN = {
    x: 0,
    y: 0,
    width: 10,
    height: 10,
  };

  readonly SCALE = 10;

  constructor({ p5 }: { p5: P5 }) {
    super({ p5, name: "Random Ellipse" });

    this._colors = {
      blue: p5.color(191, 224, 255),
      darkRed: p5.color(156, 47, 47),
      darkGreen: p5.color(47, 156, 88),
    };
  }

  drawShape = ({
    position: { x, y },
    dimensions: { width, height },
    fillColor,
    strokeColor,
  }: {
    position: { x: number; y: number };
    dimensions: { width: number; height: number };
    fillColor: P5.Color;
    strokeColor: P5.Color;
  }) => {
    this._p5.fill(fillColor);
    this._p5.stroke(strokeColor);

    this._p5.ellipse(x, y, width, height);
  };

  getModifierValue = ({
    multiplier,
    scale,
  }: {
    multiplier: number;
    scale: number;
  }) => {
    return multiplier * this._p5.random(scale);
  };

  getMultiplier = ({
    attr,
    min,
    max,
  }: {
    attr: number;
    min: number;
    max: number;
  }) => {
    if (attr <= min) return 1;
    if (attr >= max) return -1;

    return Math.random() > 0.5 ? 1 : -1;
  };

  draw = () => {
    const attributes: Array<keyof typeof this.ATTRIBUTE_VALUES> = Object.keys(
      this.ATTRIBUTE_VALUES
    ) as Array<keyof typeof this.ATTRIBUTE_VALUES>;
    attributes.forEach((attribute) => {
      const multiplier = this.getMultiplier({
        attr: this.ATTRIBUTE_VALUES[attribute],
        min: this.MIN[attribute],
        max: this.MAX[attribute],
      });

      const modifier = this.getModifierValue({
        multiplier,
        scale: this.SCALE,
      });

      this.ATTRIBUTE_VALUES[attribute] += modifier;
    });

    this.drawShape({
      position: {
        x: this.ATTRIBUTE_VALUES.x,
        y: this.ATTRIBUTE_VALUES.y,
      },
      dimensions: {
        width: this.ATTRIBUTE_VALUES.width,
        height: this.ATTRIBUTE_VALUES.height,
      },
      fillColor: this._colors.blue,
      strokeColor: this._colors.darkRed,
    });
  };

  setup = () => {
    this._p5.createCanvas(CANVAS_SIZE, CANVAS_SIZE);

    this._p5.background(this._colors.darkRed);
  };
}
