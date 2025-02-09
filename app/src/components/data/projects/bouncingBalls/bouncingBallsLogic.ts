import {ObjectArray} from "../../../helper/types";

const MIN_VELOCITY = 1;

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
  parentElement: HTMLElement = document.body

  allBalls: Ball[] = [];

  ballColliding: boolean = true;
  isRunning: boolean = false;

  gravity = 9.81;
  minGroundDist = 0.8;
  fps = 30;
  updateInterval = 1000 / this.fps; // 30 Mal pro Sekunde

  left = 0;
  top = 0;
  width = 0;
  height = 0;

  constructor(parentElement?: HTMLElement) {
    // this.field.style.backgroundColor = "rgba(128, 128, 0, 0.5)";
    this.field.style.backgroundColor = "rgba(0, 0, 0, 1)";
    this.field.style.border = "1px solid";
    this.field.style.position = "absolute";
    this.field.style.left = "0";
    this.field.style.top = "0";
    this.field.style.width = "100%";
    this.field.style.height = "100%";
    this.field.style.zIndex = "999";

    if (!!parentElement) this.parentElement = parentElement;

    const parentBounds = this.parentElement.getBoundingClientRect();
    this.left = parentBounds.left;
    this.top = parentBounds.top;
    this.width = parentBounds.width;
    this.height = parentBounds.height;
    // this.width = window.innerWidth;
    // this.height = window.innerHeight;
    // this.field.style.left = `${this.left}px`;
    // this.field.style.top = `${this.top}px`;
    this.field.style.width = `${this.width}px`;
    this.field.style.height = `${this.height}px`;

  }

  start(ballNumber: number = 2) {
    this.parentElement.appendChild(this.field);
    for (let i = 0; i < ballNumber; i++) {
      new Ball(this);
    }
    this.createEndButton();
    this.isRunning = true;
  }

  createEndButton() {
    const endButton = document.createElement("button");
    endButton.className = "end-button";
    endButton.textContent = "End Game";
    endButton.addEventListener("click", () => {
      this.end();
      if (endButton.parentElement) {
        endButton.parentElement.removeChild(endButton);
      }
    });

    this.parentElement.appendChild(endButton);
  }

  end() {
    // Remove all balls from the DOM and clear the array
    this.allBalls.forEach((ball) => {
      ball.cleanUp();
    });
    this.allBalls = [];

    // Remove the field div from the DOM
    if (this.field.parentElement) {
      this.field.parentElement.removeChild(this.field);
    }
    this.field.replaceWith(this.field.cloneNode(true)); // Remove all event listeners from field
    this.isRunning = false;

    // Dereference properties to allow garbage collection
    this.parentElement = null!;
    this.field = null!;
    this.allBalls = null!;
  }

  getAllBalls() {
    return this.allBalls;
  }
}

// Klasse Ball definieren
export class Ball {
  game: Game;

  id = Math.floor(Math.random() * 100000000000000);
  circle = document.createElement("div");
  defaultBallSizeX = 50 //this.getRandomSize();
  ballSizeX = this.defaultBallSizeX //this.getRandomSize();
  defaultBallSizeY = 50 //this.getRandomSize();
  ballSizeY = this.defaultBallSizeY // this.getRandomSize();

  // Variablen für die Position und Geschwindigkeit des Balls festlegen
  positionX = 0;
  positionY = 0;
  ballPressed = false;
  velocityX = 0 //this.getRandomVelocity();
  velocityY = 9.81;
  // velocityY = this.getRandomVelocity();
  bounceFactor = 0.8; // 0.3 - 0.9
  lastBounceHeight = 0;
  groundFrictionX = 0.05;
  frictionX = 0.0;
  frictionY = 0.05;
  collidedBalls: ObjectArray<boolean> = {};

  MAX_VELOCITY_X = 10;
  MAX_VELOCITY_Y = 10;

  // Zeitvariablen für die Begrenzung der Berechnungen auf 30 Mal pro Sekunde
  lastUpdateTime = performance.now();
  timeDelta = 0;

  maxHeight = 0;
  maxWidth = 0;

  constructor(game: Game) {
    this.game = game;
    this.game.allBalls.push(this)

    this.circle.className = "ball";
    this.circle.style.width = this.ballSizeX + "px";
    this.circle.style.height = this.ballSizeY + "px";
    this.circle.style.borderRadius = "50%";
    this.circle.style.border = "2px solid";
    this.setColor(this.getBrightRandomColor());
    this.circle.style.position = "absolute";
    this.circle.style.left = "0";
    this.circle.style.top = "0";
    this.circle.style.zIndex = "1000";
    this.positionX = this.getRandomPosition(this.game.width - this.ballSizeX);
    this.positionY = this.getRandomPosition(this.game.height - this.ballSizeY);

    this.game.parentElement.appendChild(this.circle);
    this.updateMaxGameSize();

    // Event Listener binden zum clean up
    this.mouseDown = this.mouseDown.bind(this);
    this.mouseUp = this.mouseUp.bind(this);
    this.mouseMove = this.mouseMove.bind(this);
    // Event Listener zum Drücken und Loslassen der Maustaste hinzufügen
    this.circle.addEventListener("mousedown", this.mouseDown);
    document.addEventListener("mouseup", this.mouseUp);
    // Event Listener zum Erfassen der Mausposition hinzufügen
    document.addEventListener("mousemove", this.mouseMove);

    // Ballanimation starten
    this.movingBall();
  }

  mouseDown = (event: MouseEvent) => {
    this.ballPressed = true;
    event.preventDefault();
    event.stopPropagation();
    // TODO: setPointerCapture
  }
  mouseUp = (event: MouseEvent) => {
    this.ballPressed = false;
    event.preventDefault();
    event.stopPropagation();
  }
  mouseMove = (event: MouseEvent) => {
    this.movingBall(event);
    event.preventDefault();
    event.stopPropagation();
  }

  cleanUp() {
    this.circle.removeEventListener("mousedown", this.mouseDown);
    document.removeEventListener("mouseup", this.mouseUp);
    document.removeEventListener("mousemove", this.mouseMove);

    // Entferne das HTML-Element
    if (this.circle.parentElement) {
      this.circle.parentElement.removeChild(this.circle);
    }
    this.circle.replaceWith(this.circle.cloneNode(true)); // Remove all event listeners

    // Referenzen entfernen, damit der Garbage Collector dieses Objekt entsorgen kann

    this.circle = null!;
    this.collidedBalls = null!;
    this.game = null!;

  }

  // Funktion zum Bewegen des Balls
  movingBall(event?: MouseEvent) {

    if (!this?.game?.isRunning) return;

    // Zeit seit dem letzten Frame berechnen
    const currentTime = performance.now();
    this.timeDelta += (currentTime - this.lastUpdateTime);
    this.lastUpdateTime = currentTime;

    // Für die Ballbewegung nach dem Loslassen der Maus
    if (!this.ballPressed) {
      if (this.timeDelta >= this.game.updateInterval) {
        // Bildschirmgrenzen berechnen
        const isLeft = this.positionX <= 0;
        const isRight = this.positionX + this.ballSizeX >= this.game.width;
        const isTop = this.positionY <= 0;
        const isBottom = this.positionY + this.ballSizeY >= this.game.height;

        // Gravitation anwenden, wenn der Ball nicht am Boden ist
        if (!isBottom) {
          const adjustedGravity = this.game.gravity * (this.timeDelta / 1000);
          this.setVelocityY(this.velocityY + adjustedGravity); // Gravity mit Delta Zeit
        }

        // Horizontal Geschwindigkeit durch Reibung verringern
        this.setVelocityX(this.velocityX * (1 - this.frictionX)); // X-Verlust durch Luftreibung
        this.setVelocityY(this.velocityY * (1 - this.frictionY)); // Y-Verlust durch Luftreibung


        if (!!this?.game?.ballColliding) {
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
        }

        // Boden- und Wand-Logik: Abprallen
        if (isBottom) {
          this.setPositionY(this.game.height - this.ballSizeY); // Korrigiere Position am Boden
          let bounceHeightVelo = (1 + (this.game.height / this.lastBounceHeight) * 0.4);
          if (this.lastBounceHeight > this.maxHeight - 10) bounceHeightVelo = 1;
          this.setVelocityY(this.velocityY * -this.bounceFactor * bounceHeightVelo); // Mit Bounce-Faktor abprallen
          this.setVelocityX(this.velocityX * (1 - this.groundFrictionX)); // Horizontale Geschwindigkeit leicht reduzieren
          this.lastBounceHeight = this.maxHeight;
          if (Math.abs(this.velocityY) < this.game.minGroundDist) this.setVelocityY(0); // Setze Y-Geschwindigkeit auf 0, wenn es zu langsam ist
        }

        if (isTop) {
          this.setPositionY(0);
          this.setVelocityY(this.velocityY * -this.bounceFactor);
        }

        if (isLeft) {
          this.setPositionX(0);
          this.setVelocityX(this.velocityX * -this.bounceFactor);
        }

        if (isRight) {
          this.setPositionX(this.game.width - this.ballSizeX);
          this.setVelocityX(this.velocityX * -this.bounceFactor);
        }
        // Ballposition basierend auf Geschwindigkeit aktualisieren
        if (Math.abs(this.velocityX) >= MIN_VELOCITY) this.setPositionX(this.positionX + this.velocityX);
        if (Math.abs(this.velocityY) >= MIN_VELOCITY) this.setPositionY(this.positionY + this.velocityY);

        // Zeit zurücksetzen
        this.timeDelta = 0;
      }
    }

    // Mausbewegung: Position anpassen
    if (this.ballPressed && !!event) {
      const parentBounds = this.game.parentElement.getBoundingClientRect();
      const newPositionX = event.clientX - parentBounds.left - this.ballSizeX / 2;
      const newPositionY = event.clientY - parentBounds.top - this.ballSizeY / 2;

      // Begrenze Position innerhalb des Spielfelds
      this.setPositionX(newPositionX);
      this.setPositionY(newPositionY);
      // Setze Geschwindigkeit je nach Bewegung
      this.setVelocityX(event.movementX);
      this.setVelocityY(event.movementY);
    }

    // Ballbewegung im DOM aktualisieren
    this.circle.style.transform = `translate(${this.positionX}px, ${this.positionY}px)`;
    this.circle.style.width = `${this.ballSizeX}px`;
    this.circle.style.height = `${this.ballSizeY}px`;
    this.updateMaxGameSize();

    // Animation fortsetzen
    if (!!this?.game?.isRunning || !!this.ballPressed) {
      requestAnimationFrame(() => this.movingBall());
    }
  }

  updateMaxGameSize() {
    this.maxWidth = this.game.width - this.ballSizeX;
    this.maxHeight = this.game.height - this.ballSizeY;
  }

  setVelocityX(newValue: number) {
    this.velocityX = Math.max(-this.MAX_VELOCITY_X, Math.min(newValue, this.MAX_VELOCITY_X));
  }

  setVelocityY(newValue: number) {
    this.velocityY = Math.max(-this.MAX_VELOCITY_Y, Math.min(newValue, this.MAX_VELOCITY_Y));
  }

  setPositionX(newValue: number) {
    this.positionX = Math.max(0, Math.min(newValue, this.maxWidth));
  }

  setPositionY(newValue: number) {
    this.positionY = Math.max(0, Math.min(newValue, this.maxHeight));
    this.lastBounceHeight = Math.min(this.positionY, this.lastBounceHeight)
  }

  setColor(newValue: string) {
    this.circle.style.borderColor = newValue;
    this.circle.style.backgroundColor = this.getDarkerColor(newValue);
  }


  getDarkerColor(color: string): string {
    const hex = color.replace(/^#/, '');
    let darker = '#';
    for (let i = 0; i < 6; i += 2) {
      const segment = Math.max(0, Math.floor(parseInt(hex.slice(i, i + 2), 16) * 0.5));
      darker += segment.toString(16).padStart(2, '0');
    }
    return darker;
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

  getBrightRandomColor() {
    var letters = "6789ABCDEF"; // Restrict to brighter hex values
    var color = "#";
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * letters.length)];
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


