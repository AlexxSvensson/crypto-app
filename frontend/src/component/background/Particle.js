export class Particle {
  constructor(img) {
    this.x = Math.random() * 1920;
    this.y = -10;
    this.speed =  Math.random() * 2 + 1;
    this.opacity = 0.7;
    this.img = img;
  }

  draw (ctx) {
    ctx.fillStyle = "white";
    ctx.globalAlpha = this.opacity;
    ctx.drawImage(this.img, this.x, this.y);
    ctx.globalAlpha = 1;
  }

  update() {
    this.y += this.speed;
    const plusOrMinus = Math.random();
    this.opacity = plusOrMinus > 0.5 ? 
                  this.opacity + Math.random() * 0.01 :
                  this.opacity - Math.random() * 0.01;
  }
}