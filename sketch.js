 var backgroundImg
var basketball, basketballImg
var hoops, hoopsImage, hoopsGroup
var cloudsImage, clouds, cloudGroup
var star,starImg,heartImg
var score=0
var gamestate = "start";
var invisibleBlock;
var life = 3;
var touch=false;
var pointSound, gameOverSound, loosingPointsSound;

function preload (){
backgroundImg=loadImage("assets/sky background.jpg")
basketballImg=loadImage("assets/basketball.png")
hoopsImage=loadImage("assets/ring.png")
cloudsImage=loadImage("assets/clouds.png")
starImg = loadImage("assets/star.png")
heartImg = loadImage("assets/heart.png")


gameOverSound = loadSound ("assets/gameending.wav")
pointSound = loadSound ("assets/points.mp3")
loosingPointsSound = loadSound ("assets/losingpoints.wav")
}




function setup() {
  createCanvas(windowWidth,windowHeight);
  basketball=createSprite(100, 250, 50, 50);
basketball.addImage("ball",basketballImg)
basketball.scale= 0.4

cloudsGroup= createGroup()

hoopsGroup= createGroup()

invisibleBlock = createSprite(30,height/2,20,height);
invisibleBlock.visible = false;

}

function draw() {
  background(backgroundImg); 
  image (starImg,430,20,50,50)
  image (heartImg,230,20,75,75)

  textSize(30)
  text(score, 500,55);

  textSize(30)
  text(life, 300,55);

 

  if (keyDown(UP_ARROW)) {
    gamestate="play"
  }
if (gamestate=="play") {
  if (keyDown("space")) {
    basketball.velocityY= -10
  
  }
  
  basketball.velocityY = basketball.velocityY + 0.8
}

if(basketball.isTouching(hoopsGroup)){
basketball.overlap(hoopsGroup,(ball,hoop)=>{
score=score+1
pointSound.play()
star=createSprite(hoop.x,hoop.y,10,10);
star.addImage(starImg);
star.scale=0.01
star.velocityY=-5;
hoop.remove ()



})
}


//create invisible left edge

invisibleBlock.overlap(hoopsGroup,(invisible,hoop)=>{
 
   hoop.remove();
   life=life-1;
   loosingPointsSound.play()
  
   

})



  spawnHoops() 
  spawnClouds();

if (life==0||basketball.y>height) {
  gamestate="end"
  console.log("gameOver")

}

if (gamestate=="end") {
  gameOver()
  gameOverSound.play()
  hoopsGroup.setVelocityXEach(0)
  cloudsGroup.setVelocityXEach(0)
}

  drawSprites();

}

function spawnHoops() {
  if (frameCount %110 == 0) {
    hoops = createSprite(width, random(400,600), 20, 30)
  hoops.addImage(hoopsImage);
  hoops.scale= 0.5
  hoops.velocityX = -3;
  hoops.lifetime = 700;
  hoopsGroup.add(hoops);
  hoops.debug=false
  hoops.setCollider("rectangle",0,0,30,30)

  basketball.depth= hoops.depth-5
  }
  
}
function spawnClouds() {
  if (frameCount %250 == 0) {
    clouds = createSprite(width, random(100,200), 20, 30)
  clouds.addImage(cloudsImage);
  clouds.scale= 0.3
  clouds.velocityX = -2;
  clouds.lifetime = 1000;
  cloudsGroup.add(clouds);
  basketball.depth=clouds.depth+1
  }
  }


  function gameOver() {
    swal(
      {
        title: `Game Over!!!`,
        text: "Thanks for playing!!",
        imageUrl:"assets/basketball.png" ,
        imageSize: "150x150",
        confirmButtonText: "Play Again"
      },
      function(isConfirm) {
        if (isConfirm) {
          location.reload();
        }
      }
    );
  }