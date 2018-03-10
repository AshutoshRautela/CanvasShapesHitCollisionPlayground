function Scene(name, width , height){
    this.name = name ? name : "Scene";
    this.width = width ? width : 1024;
    this.height = height ? height : 768;
    this.entities = new Map();

    this.setupCanvas();
    this.setupContext();
}

Scene.prototype.setupCanvas = function(){
    this.canvas = document.createElement("canvas");
    this.canvas.width = this.width;
    this.canvas.height = this.height;

    this.canvas.style.position = "absolute";
    this.canvas.style.top = "50%";
    this.canvas.style.left = "50%";
    this.canvas.style.transform = "translate(-50% , -50%)";

    document.body.appendChild(this.canvas);
}

Scene.prototype.setupContext = function(){
    this.context2D = this.canvas.getContext('2d');
}

Scene.prototype.checkCollisionWithPoint = function(point){
    this.entities.forEach(entity => entity.checkCollisionWithPoint(point));
}

Scene.prototype.render = function(){
    this.context2D.fillStyle='#000';
    this.context2D.clearRect(0, 0, this.width, this.height);
    this.context2D.fillRect(0 , 0 , this.width , this.height);
 
    this.entities.forEach(entity => entity.render(this.context2D));
}

Scene.prototype.add = function(shape){
    this.entities.set(shape.id , shape);
}

