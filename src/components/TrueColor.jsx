import React, { useRef, useEffect, useContext } from "react";
import { TheColor } from "./TheColor";

const TrueColor = (props) => {
  const answerColor = useContext(TheColor);
  const canvasRef = useRef(null);

  useEffect(() => {
    const draw = (ctx) => {
      ctx.fillStyle = answerColor;
      ctx.beginPath();
      ctx.rect(0, 0, 384, 70);
      ctx.fill();
    };

    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");

    //Our draw come here
    draw(context);
  }, [answerColor]);

  return (
    <div>
      <canvas ref={canvasRef} {...props} width="384" height="70" />
    </div>
  );
};

export default TrueColor;
