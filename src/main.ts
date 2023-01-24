import "./style.css";
import P5 from "p5";
import sketches from "./sketches";

new P5((p5: P5) => {
  const sketch = new sketches.RandonEllipse({ p5 });

  p5.setup = () => {
    sketch.setup();
    const title = document.getElementById("title");
    if (title) title.textContent = sketch._name || "Sketch";
  };

  p5.draw = () => {
    sketch.draw();
  };
});
