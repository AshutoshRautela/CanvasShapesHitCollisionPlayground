function Line(id, startPoint , endPoint){
    this.id = id || "defineID";
    this.startPoint = startPoint || new Vector2D(10 , 10);
    this.endPoint = endPoint || new Vector2D(100, 100);

    this.lineSlope;
    this.yIntercept;
    this.context2D;

    this.children = new Map();
    this.strokeColor = "#ffff";
    this.strokeWidth = 2;
    
    this.transform = {};
    this.transform.a = 1;
    this.transform.b = 0;
    this.transform.c = 0;
    this.transform.d = 1;
    this.transform.e = 0;
    this.transform.f = 0;
}

Line.prototype.render = function(context2D){
    !this.context2D && (this.context2D = context2D);
    !this.transform && (this.transform = this.context2D.transform);
    this.context2D.save();
    this.context2D.strokeStyle = this.strokeColor || '#ffff';
    this.context2D.transform(this.transform.a , this.transform.b, this.transform.c, this.transform.d , this.transform.e , this.transform.f);
    this.context2D.beginPath();
    this.context2D.moveTo(this.startPoint.x, this.startPoint.y);
    this.context2D.lineTo(this.endPoint.x, this.endPoint.y);
    this.context2D.lineWidth = this.strokeWidth;
    this.context2D.stroke();
    this.context2D.closePath();
    
    this.context2D.restore();
    
    this.lineSlope = (this.endPoint.y - this.startPoint.y)/(this.endPoint.x - this.startPoint.x);
    this.yIntercept = this.endPoint.y - (this.lineSlope * this.endPoint.x); 

    this.children.forEach(child => child.render(context2D));
}

Line.prototype.addChild = function(childShape){
    this.children.set(childShape.id , childShape);
}

Line.prototype.checkCollisionWithPoint = function(point){
    if(DistanceThreshold <= 0){
        (point.y === this.lineSlope * point.x + this.yIntercept) ? console.log(`Point exists on Line`) : console.log(`Point doesn't lies on line`);  //For accurate check
    }
    else{
        const pointPerpendicularSlope = -(1/this.lineSlope);
        const pointPerpendicularYIntercept = point.y - (pointPerpendicularSlope * point.x);
        
        const pointPerpendicular = new Vector2D();
        pointPerpendicular.x = (pointPerpendicularYIntercept - this.yIntercept)/(this.lineSlope - pointPerpendicularSlope);
        pointPerpendicular.y = pointPerpendicularSlope * pointPerpendicular.x + pointPerpendicularYIntercept;

        //Check if the Perpendicular Point lies in the Line Segment
        const distanceWithStartPoint = Vector2D.Distance(this.startPoint , pointPerpendicular);
        const distanceWithEndPoint = Vector2D.Distance(this.endPoint , pointPerpendicular);
        const lengthOfLineSegment = Vector2D.Distance(this.startPoint , this.endPoint);

        // console.log(`Distance With Start Point ${distanceWithStartPoint}`);
        // console.log(`Distance With End Point ${distanceWithEndPoint}`);
        // console.log(`Total Sum ${distanceWithStartPoint + distanceWithEndPoint}`);
        // console.log(`Length of the Line Segment ${lengthOfLineSegment}`);

        MouseController.GetCordinatesWithCanvas(this.context2D , point);

        this.strokeColor = "#ffff";
        if(lengthOfLineSegment + 10 >= distanceWithStartPoint + distanceWithEndPoint)
        {
            const line = new Line(this.id + "_child1" , point , pointPerpendicular);
            if(line.getLength() < this.strokeWidth + 2){
                HitCheckTest.RegisterHit(this);
                this.strokeColor = `#3A8235`;
            }
        }
    }   
}

Line.prototype.getLength = function(){
    return Vector2D.Distance(this.startPoint , this.endPoint);
}

Line.prototype.translate = function(direction){
    // console.log(`Translating Line ${direction.x} , ${direction.y}`);
    this.transform.e += direction.x;
    this.transform.f += direction.y;
}

