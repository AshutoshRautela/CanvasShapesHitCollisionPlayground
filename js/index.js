let scene;
let line;
let line2;
let circle;
let rectangle;
let arc;
let lineSetup;

window.onload = () => {
    console.log(`DOM load complete`);
    scene = new Scene("Shapes");

    MouseController.Activate(scene.canvas);
    HitCheckTest.Activate();

    line = new Line("line1");
    line2 = new Line("line2" , new Vector2D(600 ,200) , new Vector2D(900 , 250));

    circle = new Circle("circle1", new Vector2D(200 , 200) , 100);
    rectangle = new Rectangle("rectangle1");
    arc = new Arc("arc1" , new Vector2D(500 , 400));

    scene.add(line);
    scene.add(line2);
    scene.add(circle);
    // scene.add(rectangle);
    scene.add(arc);

    lineSetup = new LineSetup();
    let datGUI = new dat.GUI();
    datGUI.add(lineSetup , "sPosX");
    datGUI.add(lineSetup , "sPosY");
    datGUI.add(lineSetup , "ePosX");
    datGUI.add(lineSetup , "ePosY");

    requestAnimationFrame(updateLoop);
}

function LineSetup(){
    this.sPosX = 10;
    this.sPosY = 10;
    this.ePosX = 100;
    this.ePosY = 100;
}

function updateLoop(){
    scene.render();

    line.startPoint.x = lineSetup.sPosX;
    line.startPoint.y = lineSetup.sPosY;
    line.endPoint.x = lineSetup.ePosX;
    line.endPoint.y = lineSetup.ePosY;

    requestAnimationFrame(updateLoop);
}

MouseController.onMouseDown = function(posX , posY){
   console.log(`Mouse Click Detected ${posX} , ${posY}`);
   HitCheckTest.HitTest(scene , new Vector2D(posX , posY));
   startPos.x = posX;
   startPos.y = posY;
}

let startPos = new Vector2D();
let endPos = new Vector2D();
let deltaPos = new Vector2D();

MouseController.onMouseMove = function(posX , posY){
    // console.log(`Mouse moving ${posX} , ${posY}`);
    if(HitCheckTest.elements.length > 0){
        HitCheckTest.elements.forEach( element => element.translate(deltaPos));
    }

    endPos.x = posX;
    endPos.y = posY;
    deltaPos = Vector2D.Subtract(endPos , startPos);
    startPos.x = endPos.x;
    startPos.y = endPos.y;
}

MouseController.onMouseUp = function(posX , posY){
    // console.log(`Mouse Up ${posX} , ${posY}`);
    // HitCheckTest.elements.clear();
    HitCheckTest.elements.splice(0, HitCheckTest.elements.length);
}




