import { DIRECTION } from "./types";
import { Canvas } from "./Canvas";

interface Coordinates {
  x: number
  y: number
}

export class Snake {
  canvas: HTMLCanvasElement
  context: CanvasRenderingContext2D
  y: number
  start: number | null = null
  snakePositions: Coordinates[] = []
  snakeArr: Coordinates[][] = []
  rowCells: number
  columnCells: number
  food: Coordinates
  eating = false

  constructor(
    public x: number,
    public direction: DIRECTION,
    public speed: number,
    public squareWidth: number
  ) {
    const { canvas, context } = new Canvas(500, 500)
    this.canvas = canvas
    this.context = context
    this.y = 100
    this.snakePositions.push({ x: this.x, y: this.y })
    this.rowCells = this.canvas.width / this.squareWidth
    this.columnCells = this.canvas.height / this.squareWidth
    this.makeGrid()
    this.eat()
    this.food = this.addFood()
  }

  public move() {
    if (this.start === null) {
      this.start = Date.now()
    }

    if (Date.now() - this.start > 1000 / this.speed) {
      this.context.fillStyle = "black"
      this.handlePosition(this.canvas.height, this.canvas.width)
      this.snakePositions.push({ x: this.x, y: this.y })
      this.snakePositions.forEach(({ x, y }) => {
        this.context.fillRect(x, y, this.squareWidth, this.squareWidth)
      })
      this.handleFoodCollision()
      if (this.eating === false) {
        const snakeTail = this.snakePositions.shift()!
        this.context.clearRect(snakeTail.x, snakeTail.y, this.squareWidth, this.squareWidth)
      }
      this.eating = false

      this.start = Date.now()
    }

    requestAnimationFrame(this.move.bind(this))

  }

  public eat() {
    this.eating = true
  }

  public addFood() {
    const availableCells: { x: number, y: number }[] = []

    for (let y = 0; y < this.snakeArr.length; y++) {
      for (let x = 0; x < this.snakeArr[y].length; x++) {

        const isSnakeOnCell = this.snakePositions.find((position) => {
          return (
            this.snakeArr[y][x].x === position.x &&
            this.snakeArr[y][x].y === position.y
          )
        })

        if (!isSnakeOnCell) {
          availableCells.push({
            x: this.snakeArr[y][x].x,
            y: this.snakeArr[y][x].y
          })
        }
      }
    }

    const randomArrayIndex = Math.floor(Math.random() * availableCells.length)
    const food = availableCells[randomArrayIndex]
    if (this.food) {
      this.context.clearRect(this.food.x, this.food.y, this.squareWidth, this.squareWidth)
    }
    this.context.fillStyle = "red"
    this.context.fillRect(food.x, food.y, this.squareWidth, this.squareWidth)

    return this.food = food
  }

  handleFoodCollision() {
    const isSnakeHeadOnFoodPosition = this.x === this.food.x && this.y === this.food.y
    if (isSnakeHeadOnFoodPosition) {
      this.eat()
      this.addFood()
    }
  }

  public makeGrid() {
    for (let y = 0; y < this.rowCells; y++) {
      let rowArr = []

      for (let x = 0; x < this.columnCells; x++) {
        const snakeData = {
          x: x * this.squareWidth,
          y: y * this.squareWidth,
        }

        rowArr.push(snakeData)
      }

      this.snakeArr.push(rowArr)
    }
  }

  public changeDirection(direction: DIRECTION) {
    this.direction = direction
  }

  public handlePosition(canvasHeight: number, canvasWidth: number) {
    switch (this.direction) {
      case DIRECTION.TOP:
        this.handleTopPosition(canvasHeight)
        break;
      case DIRECTION.BOTTOM:
        this.handleBottomPosition(canvasHeight)
        break
      case DIRECTION.LEFT:
        this.handleLeftPosition(canvasWidth)
        break
      case DIRECTION.RIGHT:
        this.handleRightPosition(canvasWidth)
    }
  }

  private handleTopPosition(canvasHeight: number) {
    const nextPosition = this.y - this.squareWidth
    const hasReachedTopEnd = nextPosition < 0

    this.y = hasReachedTopEnd ? canvasHeight - this.squareWidth : nextPosition
  }

  private handleBottomPosition(canvasHeight: number) {
    const nextPosition = this.y + this.squareWidth
    const hasReachedBottomEnd = nextPosition > canvasHeight - this.squareWidth

    this.y = hasReachedBottomEnd ? 0 : nextPosition
  }

  private handleLeftPosition(canvasWidth: number) {
    const nextPosition = this.x - this.squareWidth
    const hasReachedLeftEnd = nextPosition < 0

    this.x = hasReachedLeftEnd ? canvasWidth - this.squareWidth : nextPosition
  }

  private handleRightPosition(canvasWidth: number) {
    const nextPosition = this.x + this.squareWidth
    const hasReachedRightEnd = nextPosition > canvasWidth - this.squareWidth

    this.x = hasReachedRightEnd ? 0 : nextPosition
  }
}