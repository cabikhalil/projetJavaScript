var globalSpeedMutiplier = 1;  
function changeBallSpeed(coef) {
    globalSpeedMutiplier = coef;
}
class Balle{
    constructor(x,y,radius,color,speedX,speedY){
      this.x=x;
      this.y=y;
      this.radius=radius;
      this.color=color;
      this.speedX=speedX;
      this.speedY=speedY;
  
    }
    
    draw(ctx) { // Nearly the same as the old drawFilledCircle function
    var image = document.getElementById("imagemac");
    ctx.save();
    // translate the coordinate system, draw relative to it
    ctx.translate(this.x, this.y);
  
    ctx.fillStyle = this.color;
    // (0, 0) is the top left corner of the monster.
    ctx.beginPath();
    ctx.arc(0, 0, this.radius, 0, 2*Math.PI);
    //ctx.fill();
    ctx.stroke();
    ctx.closePath();
    ctx.clip();
    ctx.drawImage(image,-35,-35,70,70); //draw macron
    // GOOD practice: restore the context
    ctx.restore();

  }
  
  move() {
      this.x += this.speedX*globalSpeedMutiplier;
      this.y += this.speedY*globalSpeedMutiplier;
  }

  
  
  }