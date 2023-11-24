const ALL_BALLS = [];

function getAllBalls() {
    return ALL_BALLS;
}

function getSign(number) {
    if (number < 0) {
        return -1;
    } else if (number > 0) {
        return 1;
    } else {
        return 0;
    }
}

// Klasse Ball definieren
class Ball {

    MAX_VELOCITY_X = 10;
    MAX_VELOCITY_Y = 10;

    constructor() {
        this.id = Math.random() * 10000000000000000;
        // HTML-Element für den Kreis erstellen
        this.kreis = document.createElement("div");
        this.kreis.className = "ball";
        this.defaultBallSizeX = 50 //this.getRandomSize();
        this.ballSizeX = this.defaultBallSizeX //this.getRandomSize();
        this.defaultBallSizeY = 50 //this.getRandomSize();
        this.ballSizeY = this.defaultBallSizeY // this.getRandomSize();
        this.kreis.style.width = this.ballSizeX + "px";
        this.kreis.style.height = this.ballSizeY + "px";
        this.kreis.style.borderRadius = "50%";
        this.kreis.style.backgroundColor = this.getRandomColor();
        this.kreis.style.position = "fixed";
        this.kreis.style.left = 0;
        this.kreis.style.top = 0;
        this.kreis.style.zIndex = "1000";
        document.body.appendChild(this.kreis);

        // Variablen für die Position und Geschwindigkeit des Balls festlegen
        this.positionX = this.getRandomPosition(window.innerWidth - this.ballSizeX);
        this.positionY = this.getRandomPosition(window.innerHeight - this.ballSizeY);
        this.ballGedrueckt = false;
        this.velocityX = 0 //this.getRandomVelocity();
        this.velocityY = this.getRandomVelocity();
        this.gravity = 0.95;
        this.bounceFactor = 0.98;
        this.collidedBalls = {};

        // Zeitvariablen für die Begrenzung der Berechnungen auf 30 Mal pro Sekunde
        this.lastUpdateTime = performance.now();
        this.timeDelta = 0;
        this.fps = 60;
        this.updateInterval = 1000 / this.fps; // 30 Mal pro Sekunde

        ALL_BALLS.push(this)

        // Event Listener zum Drücken und Loslassen der Maustaste hinzufügen
        this.kreis.addEventListener("mousedown", (event) => {
            this.ballGedrueckt = true;
            event.preventDefault();
            event.stopPropagation();
            // TODO: setPointerCapture
        });

        document.addEventListener("mouseup", (event) => {
            this.ballGedrueckt = false;
            event.preventDefault();
            event.stopPropagation();
        });

        // Event Listener zum Erfassen der Mausposition hinzufügen
        document.addEventListener("mousemove", (event) => {
            this.bewegeBall(event);
            event.preventDefault();
            event.stopPropagation();
        });

        // Ballanimation starten
        this.bewegeBall();
    }

    // Funktion zum Bewegen des Balls
    bewegeBall(event) {
        // Zeit seit dem letzten Update berechnen
        var currentTime = performance.now();
        this.timeDelta += currentTime - this.lastUpdateTime;
        this.lastUpdateTime = currentTime;

        // Ball nur bewegen, wenn die Maustaste gedrückt ist
        if (this.ballGedrueckt && !!event) {
            // Die Position des Balls basierend auf der Mausposition aktualisieren
            this.setPositionX(event.clientX - (this.ballSizeX / 2))
            this.setPositionY(event.clientY - (this.ballSizeY / 2))
            // Geschwindigkeit basierend auf der Mausbewegung festlegen
            this.setVelocityX(event.movementX / 10)
            this.setVelocityY(event.movementY / 4)

        } else if (!this.ballGedrueckt) {
            // Ball nach unten bewegen, nur wenn das Update-Intervall erreicht wurde
            if (this.timeDelta >= this.updateInterval) {
                // add gravity for down movement
                this.setVelocityY(this.velocityY + this.gravity);
                this.setVelocityX(this.velocityX - 0.05);
                this.setVelocityY(this.velocityY - 0.05);

                if(this.defaultBallSizeX >= this.ballSizeX) this.ballSizeX = this.ballSizeX + 5;
                if(this.defaultBallSizeX <= this.ballSizeX) this.ballSizeX = this.ballSizeX - 5;
                if(this.defaultBallSizeY >= this.ballSizeY) this.ballSizeY = this.ballSizeY + 5;
                if(this.defaultBallSizeY <= this.ballSizeY) this.ballSizeY = this.ballSizeY - 5;

                this.setPositionX(this.positionX + this.velocityX)
                this.setPositionY(this.positionY + this.velocityY)

                // Abprallen, wenn der Ball mit einem anderen Ball kollidiert
                const allBalls = getAllBalls();
                for (var i = 0; i < allBalls.length; i++) {
                    var otherBall = allBalls[i];
                    if (otherBall.kreis !== this.kreis && !this.collidedBalls[otherBall.id]) {
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

                if (isBottom) this.ballSizeY = this.ballSizeY/1.05;

                // Abprallen, wenn der Ball den Boden erreicht
                if (isTop || isBottom) {
                    this.setVelocityY(this.velocityY * -this.bounceFactor);
                }
                if (isBottom) this.setVelocityX(this.velocityX * (0.9 + this.bounceFactor / 10));

                if (isTop) this.setPositionY(0);
                if (isBottom) this.setPositionY(window.innerHeight - this.ballSizeY);

                // Abprallen, wenn der Ball den linken oder rechten Rand erreicht
                if (isLeft || isRight) {
                    this.setVelocityX(this.velocityX * -this.bounceFactor);
                }

                // kill to small movement
                if (Math.abs(this.velocityX) < 0.1) this.setVelocityX(0);
                if (Math.abs(this.velocityY) < 0.1) this.setVelocityY(0);

                this.timeDelta = 0; // Zeit zurücksetzen
            }
        }
        // Ballposition im HTML aktualisieren
        this.kreis.style.transform = "translate(" + this.positionX + "px, " + this.positionY + "px)";
        this.kreis.style.width = this.ballSizeX + "px";
        this.kreis.style.height = this.ballSizeY + "px";

        // Ballanimation fortsetzen
        requestAnimationFrame(() => {
            this.bewegeBall();
        });
    }

    setVelocityX(newValue) {
        this.velocityX = Math.max(-this.MAX_VELOCITY_X, Math.min(newValue, this.MAX_VELOCITY_X));
    }

    setVelocityY(newValue) {
        this.velocityY = Math.max(-this.MAX_VELOCITY_Y, Math.min(newValue, this.MAX_VELOCITY_Y));
    }

    setPositionX(newValue) {
        this.positionX = Math.max(0, Math.min(newValue, window.innerHeight));
    }

    setPositionY(newValue) {
        this.positionY = Math.max(0, Math.min(newValue, window.innerWidth));
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

    getRandomSize(min = 25, max= 100) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    // Funktion zur Generierung einer zufälligen Position
    getRandomPosition(max) {
        return Math.floor(Math.random() * max);
    }

    // Funktion zur Generierung einer zufälligen Geschwindigkeit
    getRandomVelocity() {
        return Math.random() * 2 - 1; // Geschwindigkeit zwischen -1 und 1
    }

    // Funktion zum Überprüfen der Kollision mit einem anderen Ball
    checkCollision(otherBall) {
        const diffX = (otherBall.positionX + (otherBall.ballSizeX / 2)) - (this.positionX + (this.ballSizeX / 2));
        const diffY = (otherBall.positionY + (otherBall.ballSizeY / 2)) - (this.positionY + (this.ballSizeY / 2));
        const diffDelta = Math.sqrt(Math.pow(diffX, 2) + Math.pow(diffY, 2));
        return [((Math.max(this.ballSizeX,this.ballSizeY) / 2) + (Math.max(otherBall.ballSizeX,otherBall.ballSizeY) / 2)) > diffDelta, diffX, diffY, diffDelta];
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
        // var rect1 = this.kreis.getBoundingClientRect();
        // var rect2 = otherBall.kreis.getBoundingClientRect();
        //
        // return (
        //     rect1.left < rect2.right &&
        //     rect1.right > rect2.left &&
        //     rect1.top < rect2.bottom &&
        //     rect1.bottom > rect2.top
        // );
    }

}

class Game {
    constructor() {
        this.field = document.createElement("div");
        this.field.style.backgroundColor = "black"
        this.field.style.position = "fixed";
        this.field.style.left = 0;
        this.field.style.top = 0;
        this.field.style.width = "100%";
        this.field.style.height = "100%";
        this.field.style.zIndex = "999";
        document.body.appendChild(this.field);
    }
}

new Game();
// 10 Instanzen der Klasse Ball erstellen
for (let i = 0; i < 2; i++) {
    new Ball();
}
