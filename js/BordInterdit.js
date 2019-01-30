class BordInterdit{
    constructor(x,y,width,height,color){
      this.x=x;
      this.y=y;
      this.width=width;
      this.height=height;
      this.color=color;
    
    }

draw(ctx){
// GOOD practice: save the context, use 2D trasnformations
var img = document.getElementById("imagemoney");
var img1 = document.getElementById("imagemoney1");

ctx.save();


// translate the coordinate system, draw relative to it
ctx.translate(this.x, this.y);

ctx.fillStyle = "white";
// (0, 0) is the top left corner of the monster.
if (this.x == 0 && this.y == 0){
    ctx.restore();
    ctx.fillRect(this.x, this.y, this.height,this.width);
    ctx.drawImage(img1,this.x, this.y, this.height,this.width);
    
    
}
else if(this.x == 600 && this.y == 0){
    ctx.restore();
    ctx.fillRect(this.x, this.y,-600,30);
    ctx.drawImage(img,this.x, this.y,-600,30);
}
else if(this.x == 0 && this.y == 600){
    ctx.restore();
    ctx.fillRect(this.x, this.y-30,600,30);
    ctx.drawImage(img,this.x, this.y-30,600,30);
}

else if(this.x == 600 && this.y == 600){
    ctx.restore();
    ctx.fillRect(this.x-30, this.y,30,-600);
    ctx.drawImage(img1,this.x-30, this.y,30,-600);
}


// GOOD practice: restore the context
ctx.restore();


}

}