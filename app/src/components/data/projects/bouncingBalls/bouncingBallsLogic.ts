import {ObjectArray} from "../../../helper/types";

function getSign(number: number) {
  if (number < 0) {
    return -1;
  } else if (number > 0) {
    return 1;
  } else {
    return 0;
  }
}

export class Game {
  field = document.createElement("div");
  allBalls: Ball [] = [];
  gravity = 0.95;
  fps = 30;
  updateInterval = 1000 / this.fps; // 30 Mal pro Sekunde

  constructor() {
    this.field.style.backgroundColor = "black"
    this.field.style.position = "fixed";
    this.field.style.left = "0";
    this.field.style.top = "0";
    this.field.style.width = "100%";
    this.field.style.height = "100%";
    this.field.style.zIndex = "999";
    document.body.appendChild(this.field);
  }

  start(ballNumber: number = 2) {
    for (let i = 0; i < ballNumber; i++) {
      new Ball(this);
    }

  }

  getAllBalls() {
    return this.allBalls;
  }
}

// Klasse Ball definieren
export class Ball {
  game: Game;

  id = Math.random() * 10000000000000000;
  circle = document.createElement("div");
  defaultBallSizeX = 50 //this.getRandomSize();
  ballSizeX = this.defaultBallSizeX //this.getRandomSize();
  defaultBallSizeY = 50 //this.getRandomSize();
  ballSizeY = this.defaultBallSizeY // this.getRandomSize();

  // Variablen für die Position und Geschwindigkeit des Balls festlegen
  positionX = this.getRandomPosition(window.innerWidth - this.ballSizeX);
  positionY = this.getRandomPosition(window.innerHeight - this.ballSizeY);
  ballPressed = false;
  velocityX = 0 //this.getRandomVelocity();
  velocityY = this.getRandomVelocity();
  bounceFactor = 0.7;
  frictionX = 0.05;
  frictionY = 0.0;
  collidedBalls: ObjectArray<boolean> = {};

  MAX_VELOCITY_X = 10;
  MAX_VELOCITY_Y = 10;

  // Zeitvariablen für die Begrenzung der Berechnungen auf 30 Mal pro Sekunde
  lastUpdateTime = performance.now();
  timeDelta = 0;


  constructor(game: Game) {
    this.game = game;
    this.game.allBalls.push(this)
    this.circle.className = "ball";

    this.circle.style.width = this.ballSizeX + "px";
    this.circle.style.height = this.ballSizeY + "px";
    this.circle.style.borderRadius = "50%";
    this.setColor(this.getRandomColor());
    this.circle.style.position = "fixed";
    this.circle.style.left = "0";
    this.circle.style.top = "0";
    this.circle.style.zIndex = "1000";
    document.body.appendChild(this.circle);


    // Event Listener zum Drücken und Loslassen der Maustaste hinzufügen
    this.circle.addEventListener("mousedown", (event) => {
      this.ballPressed = true;
      event.preventDefault();
      event.stopPropagation();
      // TODO: setPointerCapture
    });

    document.addEventListener("mouseup", (event) => {
      this.ballPressed = false;
      event.preventDefault();
      event.stopPropagation();
    });

    // Event Listener zum Erfassen der Mausposition hinzufügen
    document.addEventListener("mousemove", (event) => {
      this.movingBall(event);
      event.preventDefault();
      event.stopPropagation();
    });

    // Ballanimation starten
    this.movingBall();
  }

  // Funktion zum Bewegen des Balls
  movingBall(event?: MouseEvent) {
    // Zeit seit dem letzten Update berechnen
    var currentTime = performance.now();
    this.timeDelta += currentTime - this.lastUpdateTime;
    this.lastUpdateTime = currentTime;

    // Ball nur bewegen, wenn die Maustaste gedrückt ist
    if (this.ballPressed && !!event) {
      // Die Position des Balls basierend auf der Mausposition aktualisieren
      this.setPositionX(event.clientX - (this.ballSizeX / 2))
      this.setPositionY(event.clientY - (this.ballSizeY / 2))
      // Geschwindigkeit basierend auf der Mausbewegung festlegen
      this.setVelocityX(event.movementX / 10)
      this.setVelocityY(event.movementY / 4)

    } else if (!this.ballPressed) {
      // Ball nach unten bewegen, nur wenn das Update-Intervall erreicht wurde
      if (this.timeDelta >= this.game.updateInterval) {

        const lastFrameIsLeft = this.positionX <= 0;
        const lastFrameIsRight = this.positionX + this.ballSizeX >= window.innerWidth;
        const lastFrameIsTop = this.positionY <= 0;
        const lastFrameIsBottom = this.positionY + this.ballSizeY >= window.innerHeight;

        // add gravity for down movement
        if (!lastFrameIsBottom) this.setVelocityY(this.velocityY + this.game.gravity);
        this.setVelocityX(this.velocityX - this.frictionX);
        this.setVelocityY(this.velocityY - this.frictionY);

        if (this.defaultBallSizeX >= this.ballSizeX) this.ballSizeX = this.ballSizeX + 5;
        if (this.defaultBallSizeX <= this.ballSizeX) this.ballSizeX = this.ballSizeX - 5;
        if (this.defaultBallSizeY >= this.ballSizeY) this.ballSizeY = this.ballSizeY + 5;
        if (this.defaultBallSizeY <= this.ballSizeY) this.ballSizeY = this.ballSizeY - 5;

        this.setPositionX(this.positionX + this.velocityX)
        this.setPositionY(this.positionY + this.velocityY)

        // Abprallen, wenn der Ball mit einem anderen Ball kollidiert
        const allBalls = this.game.getAllBalls();
        for (let i = 0; i < allBalls.length; i++) {
          let otherBall = allBalls[i];
          if (otherBall.circle !== this.circle && !this.collidedBalls[otherBall.id]) {
            const [isCollide, diffX, diffY, diffDelta] = this.checkCollision(otherBall);
            if (isCollide) {
              const tempVelocityX = this.velocityX;
              const tempVelocityY = this.velocityY;
              console.log("Collission:", diffX);
              // console.log("velocity Y:", this.velocityY, otherBall.velocityY);

              this.setVelocityX(otherBall.velocityX + ((this.ballSizeY - diffDelta)) * (otherBall.velocityY * getSign(diffX)));
              // this.setVelocityX(otherBall.velocityX - (Math.abs(this.ballSize-diffX) /Math.abs(this.ballSize-diffY))* (otherBall.velocityY));
              // this.setVelocityX(otherBall.velocityX + (this.ballSize-diffX * (otherBall.velocityY/otherBall.MAX_VELOCITY_Y)));
              this.setVelocityY(otherBall.velocityY - ((diffY)));

              otherBall.setVelocityX(tempVelocityX + ((otherBall.ballSizeY - diffDelta)) * (tempVelocityY * getSign(diffX)));
              // otherBall.setVelocityX(tempVelocityX - (Math.abs(otherBall.ballSize-diffX) / Math.abs(otherBall.ballSize-diffY))* (tempVelocityY));
              // otherBall.setVelocityX(tempVelocityX - (this.ballSize-diffX * (tempVelocityY/this.MAX_VELOCITY_Y)));
              otherBall.setVelocityY(tempVelocityY - ((diffY)));

              otherBall.collidedBalls = {...this.collidedBalls, [this.id]: true}
              this.collidedBalls = {...this.collidedBalls, [otherBall.id]: true}
            }
          }
          if (this.collidedBalls[otherBall.id]) {
            const [isCollide, diffX, diffY, diffDelta] = this.checkCollision(otherBall);
            if (!isCollide) {
              otherBall.collidedBalls = {...this.collidedBalls, [this.id]: false}
              this.collidedBalls = {...this.collidedBalls, [otherBall.id]: false}
            }
          }
        }

        // TODO check ball collision for positioning

        const isLeft = this.positionX <= 0;
        const isRight = this.positionX + this.ballSizeX >= window.innerWidth;
        const isTop = this.positionY <= 0;
        const isBottom = this.positionY + this.ballSizeY >= window.innerHeight;

        if (isBottom) {
          this.setColor("#F00");
          this.ballSizeY = this.ballSizeY / 1.05;
        }

        // Abprallen, wenn der Ball den Boden erreicht
        if (isTop || isBottom) {
          this.setVelocityY(this.velocityY * -this.bounceFactor);
        }

        // decrease x velocity on ground because friction
        if (isBottom) {
          this.setColor("#00F");
          this.setVelocityX(this.velocityX * (0.9 + this.bounceFactor / 10));
        }

        if (isTop) this.setPositionY(0);
        if (isBottom) this.setPositionY(window.innerHeight - this.ballSizeY);

        // Abprallen, wenn der Ball den linken oder rechten Rand erreicht
        if (isLeft || isRight) {
          this.setVelocityX(this.velocityX * -this.bounceFactor);
        }

        // kill to small movement
        if (Math.abs(this.velocityX) < 0.5) this.setVelocityX(0);
        if (Math.abs(this.velocityY) < 0.5 && isBottom) {
          this.setPositionY(window.innerHeight - this.ballSizeY);
          this.setVelocityY(0);
        }

        this.timeDelta = 0; // Zeit zurücksetzen
      }
    }
    // Ballposition im HTML aktualisieren
    this.circle.style.transform = "translate(" + this.positionX + "px, " + this.positionY + "px)";
    this.circle.style.width = this.ballSizeX + "px";
    this.circle.style.height = this.ballSizeY + "px";

    // Ballanimation fortsetzen
    requestAnimationFrame(() => {
      this.movingBall();
    });
  }

  setVelocityX(newValue: number) {
    this.velocityX = Math.max(-this.MAX_VELOCITY_X, Math.min(newValue, this.MAX_VELOCITY_X));
  }

  setVelocityY(newValue: number) {
    this.velocityY = Math.max(-this.MAX_VELOCITY_Y, Math.min(newValue, this.MAX_VELOCITY_Y));
  }

  setPositionX(newValue: number) {
    this.positionX = Math.max(0, Math.min(newValue, window.innerHeight));
  }

  setPositionY(newValue: number) {
    this.positionY = Math.max(0, Math.min(newValue, window.innerWidth));
  }

  setColor(newValue: string) {
    this.circle.style.backgroundColor = newValue;
  }

  // Funktion zur Generierung einer zufälligen Farbe
  getRandomColor() {
    var letters = "0123456789ABCDEF";
    var color = "#";
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  getRandomSize(min = 25, max = 100) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  // Funktion zur Generierung einer zufälligen Position
  getRandomPosition(max: number) {
    return Math.floor(Math.random() * max);
  }

  // Funktion zur Generierung einer zufälligen Geschwindigkeit
  getRandomVelocity() {
    return Math.random() * 2 - 1; // Geschwindigkeit zwischen -1 und 1
  }

  // Funktion zum Überprüfen der Kollision mit einem anderen Ball
  checkCollision(otherBall: Ball): [boolean, number, number, number] {
    const diffX = (otherBall.positionX + (otherBall.ballSizeX / 2)) - (this.positionX + (this.ballSizeX / 2));
    const diffY = (otherBall.positionY + (otherBall.ballSizeY / 2)) - (this.positionY + (this.ballSizeY / 2));
    const diffDelta = Math.sqrt(Math.pow(diffX, 2) + Math.pow(diffY, 2));
    return [((Math.max(this.ballSizeX, this.ballSizeY) / 2) + (Math.max(otherBall.ballSizeX, otherBall.ballSizeY) / 2)) > diffDelta, diffX, diffY, diffDelta];
    // return (
    //     ((this.ballSize/2)+(otherBall.ballSize/2)) > Math.abs((otherBall.positionX+(otherBall.ballSize/2)) - (this.positionX+(this.ballSize/2))) &&
    //     ((this.ballSize/2)+(otherBall.ballSize/2)) > Math.abs((otherBall.positionY+(otherBall.ballSize/2)) - (this.positionY+(this.ballSize/2)))
    // );
    // return (
    //     this.positionX < otherBall.positionX+otherBall.ballSize &&
    //     this.positionX+this.ballSize > otherBall.positionX &&
    //     this.positionY < otherBall.positionY+otherBall.ballSize &&
    //     this.positionY+this.ballSize > otherBall.positionY
    // );
    // var rect1 = this.circle.getBoundingClientRect();
    // var rect2 = otherBall.circle.getBoundingClientRect();
    //
    // return (
    //     rect1.left < rect2.right &&
    //     rect1.right > rect2.left &&
    //     rect1.top < rect2.bottom &&
    //     rect1.bottom > rect2.top
    // );
  }
}


