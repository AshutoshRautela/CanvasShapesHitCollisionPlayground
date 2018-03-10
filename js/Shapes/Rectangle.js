function Rectangle(id , startPoint, width , height){
    this.id = id || "defineID";
    this.startPoint = startPoint || new Vector2D(100, 100);
    this.width = width || 400;
    this.height = height || 200;
}

Rectangle.prototype.render = function(context2D){
    context2D.strokeStyle = "#ffff";
    context2D.strokeRect(this.startPoint.x , this.startPoint.y , this.width , this.height);
}

Rectangle.prototype.checkCollisionWithPoint = function(point){
    // console.log(`Rectangle Check collision with point ${point.x} , ${point.y}`);
}
