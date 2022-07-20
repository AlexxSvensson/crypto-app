import {makeStyles} from "@material-ui/core"
import { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { Particle } from "./Particle";
import { ResourceHandler } from "../../utility/ResourceHandler";

const useStyles = makeStyles({
  canvas: {
    position: "absolute",
    top: "0px",
    left: "0px",
    height: "100%",
    width: "100%",
    zIndex: -100
  },
});

function BackgroundComponent() {
  const styles = useStyles();
  const dispatch = useDispatch();

  const canvasRef = useRef();
  const [ctx, setCtx] = useState(null);
  const resourceHandler = new ResourceHandler(); 

  useEffect(() => {
    setCtx(canvasRef.current.getContext("2d"));
    canvasRef.current.width = 1920;
    canvasRef.current.height = 1080;
  }, []);
  
  useEffect(() => {
    if (ctx) {
      let particles = [];
      loop(particles);
    }
  }, [ctx])
  
  const draw = (particles) => {
    ctx.clearRect(0, 0, 1920, 1080);
    ctx.fillStyle = "#1f0638";
    ctx.fillRect(0, 0, 1920, 1080)
    particles.forEach((particle) => particle.draw(ctx));
  }
  
  const update = (particles) => {
    const rnd = Math.floor(Math.random() * 30);
    if (rnd == 0 && resourceHandler.loaded) {
      particles = [
        ...particles, 
        new Particle(resourceHandler.images[[Math.floor(Math.random() * resourceHandler.images.length)]])
      ];
    }
    for (let i = 0; i < particles.length; i++) {
      particles[i].update();
      if (particles[i].y > 1100)
        particles.splice(i, 1);
    }
    return particles;
  }
    
    const loop = (particles) => {
      draw(particles);
      particles = update(particles);
      requestAnimationFrame(() => loop(particles));
  }

  return (
    <canvas className={styles.canvas} ref={canvasRef}/>
  );
}

export default BackgroundComponent;
