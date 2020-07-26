function load_images(){
    //player,virus,gem
}

function init(){
    canvas=document.getElementById("mycanvas");
    console.log(canvas);
    W=700;
    H=400;
    canvas.height=H;
    canvas.width=W;
    enemy_image =new Image;
    enemy_image.src="Virus.png"
    player_image=new Image;
    player_image.src="Player.png"
    gem_image=new Image;
    gem_image.src="Cake.png"
    game_over=false;
    
    pen=canvas.getContext('2d'); //created a context that whether it should be in 2d or 3d
    console.log(pen);
//    box={
//        x:150,
//        y:50,
//        w:60,
//        h:60,
//        speed:20,
//    };
    e1={
        x:150,
        y:50,
        w:60,
        h:60,
        speed:20,
    }
    e2={
        x:300,
        y:200,
        w:60,
        h:60,
        speed:20,
    }
    e3={
        x:450,
        y:320,
        w:60,
        h:60,
        speed:20,
    }
    enemy=[e1,e2,e3];
    p={
        x:20,
        y:H/2,
        w:60,
        h:60,
        speed:20,
        moving: false,
        health: 100,
    }
    g={
        x:600,
        y:H/2,
        w:60,
        h:60,
    };
    
    canvas.addEventListener('mousedown',function(){ //listening to the events on the canvas here 
        console.log("Mouse button pressed");
        p.moving=true;
    })
     canvas.addEventListener('mouseup',function(){ 
        console.log("Mouse button lifted");
        p.moving=false;
    })
    
}

function collide(rect1,rect2){
    if(rect1.x < rect2.x + rect2.w && rect1.x + rect1.w > rect2.x && rect1.y< rect2.y + rect2.h && rect1.y + rect1.h > rect2.y){
        return true;
    }
    return false;
}


function draw(){
    pen.clearRect(0,0,W,H); //clearing the canvas area for the old frame
    pen.fillStyle= "red";
//    pen.fillRect(box.x,box.y,box.w,box.h);
//    pen.drawImage(enemy_image,box.x,box.y,box.w,box.h);
    for(i=0;i<enemy.length;i++){
        pen.drawImage(enemy_image,enemy[i].x,enemy[i].y,enemy[i].w,enemy[i].h);
    }
    pen.drawImage(player_image,p.x,p.y,p.w,p.h);
    pen.drawImage(gem_image,g.x,g.y,g.w,g.h);
    
    pen.fillStyle= "white";
    pen.fillText("Score: "+ p.health,10,20);
}

function update(){
    for(let i=0;i<enemy.length;i++){
    enemy[i].y+=enemy[i].speed;
    if(enemy[i].y > H-enemy[i].h || enemy[i].y<0){
        enemy[i].speed *= -1;
    }
    }
    if(p.moving==true){
        p.x+=p.speed;
        p.health+=20;   
    }
    
    for(i=0;i<enemy.length;i++){
        if(collide(p,enemy[i])){
            p.health-=50;
            if(p.health<0){
                console.log(p.health);
                game_over=true;
                alert("Game Over " + p.health);
            }
        }
    }
    
    if(collide(p,g)){
        console.log('You Won Yeah!');
        game_over=true;
        alert('You won the game from Kunal with score: '+ p.health);
    }
}

function gameloop(){
    if(game_over==true){
        clearInterval(f);
    }
    draw();
    update();
    console.log("In gameloop");
}

load_images();
init();

var f= setInterval(gameloop,100);