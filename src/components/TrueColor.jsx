import React, { useRef, useEffect } from "react";

const TrueColor = (props) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const draw = (ctx) => {
      ctx.fillStyle = "#CD82C8";
      ctx.beginPath();
      ctx.rect(0, 0, 384, 70);
      ctx.fill();
    };

    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");

    //Our draw come here
    draw(context);
  }, []);

  return <canvas ref={canvasRef} {...props} />;
};

export default TrueColor;
