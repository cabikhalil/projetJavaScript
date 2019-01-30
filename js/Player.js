class Player{
    constructor(x,y,width,height,color){
      this.x=x;
      this.y=y;
      this.width=width;
      this.height=height;
      this.color=color;
      
  
    }

     draw(ctx) {
        // GOOD practice: save the context, use 2D trasnformations
        var img = document.getElementById("image");
        
        ctx.save();
      
        // translate the coordinate system, draw relative to it
        ctx.translate(this.x, this.y);
      
        ctx.fillStyle = this.color;
        // (0, 0) is the top left corner of the monster.
        ctx.fillRect(0, 0, this.width, this.height);
        ctx.drawImage(img,0,0, this.width, this.height);  //draw gilet jaune
      
        // GOOD practice: restore the context
        ctx.restore();
    }
}