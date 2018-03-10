function Circle(id, centerPoint , radius){
    this.id = id || "defineID";
    this.centerPoint = centerPoint || new Vector2D(10 , 10);
    this.radius = radius || 5;
    this.strokeColor = "#ffff";
    this.context2D;
    this.strokeWidth = 2;
}

Circle.prototype = Object.create(ShapeEntity.prototype);
Circle.prototype.constructor = Circle;

Circle.prototype.render = function(context2D){
    !this.context2D && (this.context2D = context2D);
    this.context2D.strokeStyle = this.strokeColor || '#ffff';
    this.context2D.beginPath();
    this.context2D.arc( this.centerPoint.x , this.centerPoint.y , this.radius , 0 , 2 * Math.PI , true);
    this.context2D.lineWidth = this.strokeWidth;
    this.context2D.stroke();
    this.context2D.closePath();
}

Circle.prototype.checkCollisionWithPoint = function(point){
    // console.log(`Circle Check collision with point ${point.x} , ${point.y}`);
    this.strokeColor = "#ffff";
    const distanceWithCenter = Vector2D.Distance(this.centerPoint , point);
    // console.log(`Distance with Center ${distanceWithCenter}`);
    // console.log(`Radius ${this.radius}`);
    console.log(`Diff ${Math.abs(distanceWithCenter - this.radius)}`);
    if(Math.abs(distanceWithCenter - this.radius) <= (this.strokeWidth - this.strokeWidth/5)){
        this.strokeColor = `#3A8235`;
        HitCheckTest.RegisterHit(this);
    }
}

Circle.prototype.translate = function(direction){
    //To be implemented
}
