function HitCheckTest(){
}

HitCheckTest.Activate = function(){
    HitCheckTest.elements = new Array();
    HitCheckTest.activate = true;
}

HitCheckTest.HitTest = function(scene , point){
    if(!HitCheckTest.activate)
    {
        console.warn(`Hit Test not activated`);
        return;
    }
    // HitCheckTest.elements.clear();
    // console.log(`Hitcheck Elements ${HitCheckTest.elements}`);
    scene.checkCollisionWithPoint(new Vector2D(point.x , point.y));
}

HitCheckTest.RegisterHit = function(element){
    !HitCheckTest.elements.some(elementToCheck => element.id === elementToCheck.id) && HitCheckTest.elements.push(element);
}