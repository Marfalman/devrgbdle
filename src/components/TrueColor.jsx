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

  return (
    <div>
      <canvas ref={canvasRef} {...props} width="384" height="70" />
    </div>
  );
};

export default TrueColor;
