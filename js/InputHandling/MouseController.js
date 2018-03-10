function MouseController(){}

MouseController.Activate = function(element){
    MouseController.attachTO = element || window;
    MouseController.attachTO.addEventListener("mousedown" , MouseController.MouseDownHandler, true);
    MouseController.attachTO.addEventListener("mousemove", MouseController.MouseMoveHandler, true);
    MouseController.attachTO.addEventListener("mouseup" , MouseController.MouseUpHandler, true);
}

MouseController.Deactivate = function(){
    MouseController.attachTO = MouseController.attachTO || window;
    MouseController.attachTO.removeEventListener("mousedown" , MouseController.MouseDownHandler);
    MouseController.attachTO.removeEventListener("mousemove", MouseController.MouseMoveHandler);
    MouseController.attachTO.removeEventListener("mouseup", MouseController.MouseUpHandler);
}

MouseController.MouseDownHandler = function(mouseEvent){
    MouseController.onMouseDown && MouseController.onMouseDown(mouseEvent.offsetX , mouseEvent.offsetY);
}

MouseController.MouseMoveHandler = function(mouseEvent){
    MouseController.onMouseMove && MouseController.onMouseMove(mouseEvent.offsetX , mouseEvent.offsetY);
}

MouseController.MouseUpHandler = function(mouseEvent){
    MouseController.onMouseUp && MouseController.onMouseUp(mouseEvent.offsetX , mouseEvent.offsetY);
}

MouseController.GetCordinatesWithCanvas = function(context2D , point){
    // let currentMatrix = context2D.currentTransform;
    // console.log(`Canvas Transform ${currentMatrix}`);
}
