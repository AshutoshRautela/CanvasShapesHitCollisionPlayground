function Arc(id , centerPoint , radius , startAngle , endAngle, antiClockWise){
    this.id = id || "defineID";
    this.centerPoint = centerPoint || new Vector2D(100 ,100);
    this.radius = radius || 50;
    this.startAngle = startAngle ||  0;
    this.endAngle = endAngle || Math.PI;
    this.antiClockWise = antiClockWise || true;
    this.strokeWidth = 2;
    this.strokeColor = "#ffff";
}

Arc.prototype.render = function(context2D){
    !this.context2D && (this.context2D = context2D);
    this.context2D.strokeStyle = this.strokeColor || '#ffff';
    this.context2D.beginPath();
    this.context2D.arc(this.centerPoint.x , this.centerPoint.y , this.radius , this.startAngle , this.endAngle, this.antiClockWise);
    this.context2D.stroke();
    this.context2D.closePath();
}

Arc.prototype.checkCollisionWithPoint = function(point){
    this.strokeColor = "#ffff";
    const distanceWithCenter = Vector2D.Distance(this.centerPoint , point);
    // console.log(`Diff ${Math.abs(distanceWithCenter - this.radius)}`);
    if(Math.abs(distanceWithCenter - this.radius) <= (this.strokeWidth - this.strokeWidth/5)){   // Check if lies within the circular Radius
        const vec1 = Vector2D.Subtract(point , this.centerPoint);
        const vec2 = Vector2D.Subtract(new Vector2D(this.centerPoint.x + this.radius , this.centerPoint.y) , this.centerPoint);

        const arcAngleRange = Vector2D.Angle(vec1 , vec2);
        console.log(`First Vector ${vec1.x} , ${vec1.y}`);
        console.log(`Second Vector ${vec2.x} , ${vec2.y}`);

        console.log(`Angle between the Vectors ${Vector2D.Angle(vec1 , vec2)}`);
        if(arcAngleRange > this.startAngle && arcAngleRange < this.endAngle)
        {
            this.strokeColor = `#3A8235`;
            HitCheckTest.RegisterHit(this);
        }
    }
}

Arc.prototype.translate = function(direction){

}
