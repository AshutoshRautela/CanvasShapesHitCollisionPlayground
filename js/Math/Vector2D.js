function Vector2D(x , y){
    this.x = x || 0;
    this.y = y || 0;
}

Vector2D.Distance = function(vec1 , vec2){
    return Math.sqrt((vec2.x - vec1.x)** 2 + (vec2.y - vec1.y)**2 );
}

Vector2D.prototype.normalize = function(){
    const magnitude = this.magnitude();
    this.x /= magnitude;
    this.y /= magnitude;
    return this;
}

Vector2D.prototype.magnitude = function(){
    return Math.sqrt((this.x)**2 + (this.y)**2);
}

Vector2D.Subtract = function(vec1 , vec2){
    return new Vector2D(vec1.x - vec2.x , vec1.y - vec2.y);
}

Vector2D.Angle = function(vec1 , vec2){
    return Math.acos(((vec1.x * vec2.x) + (vec1.y * vec2.y))/(vec1.magnitude() * vec2.magnitude()));
}