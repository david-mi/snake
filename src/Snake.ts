import { DIRECTION } from "./types";
import { Canvas } from "./Canvas";


export class Snake {
  canvas: HTMLCanvasElement
  context: CanvasRenderingContext2D
  y: number
  start: number | null = null
  snakePositions: { x: number, y: number }[] = []
  snakeArr: { x: number, y: number, snakeOnIt: boolean }[][] = []
  headIndex = { x: 0, y: 5 }
  rowCells: number
  columnCells: number

  constructor(
    public x: number,
    public direction: DIRECTION,
    public speed: number,
    public squareWidth: number
  ) {
    const { canvas, context, verticalCenter } = new Canvas(500, 500)
    this.canvas = canvas
    this.context = context
    this.y = verticalCenter
    this.snakePositions.push({ x: this.x, y: this.y })
    this.rowCells = this.canvas.width / this.squareWidth
    this.columnCells = this.canvas.height / this.squareWidth
    this.makeSnakeArr()
  }

  public makeSnakeArr() {
    let index = 0

    for (let y = 0; y < this.rowCells; y++) {
      let rowArr = []

      for (let x = 0; x < this.columnCells; x++) {
        const isOnStartingLine = x === 0 && y === 5

        const snakeData = {
          x: x * this.squareWidth,
          y: y * this.squareWidth,
          snakeOnIt: isOnStartingLine
        }

        rowArr.push(snakeData)
        index++
      }

      this.snakeArr.push(rowArr)
    }

    console.log(this.snakeArr)
    console.log(this.headIndex)
  }

  public move() {
    if (this.start === null) {
      this.start = Date.now()
    }

    if (Date.now() - this.start > 1000 / this.speed) {
      this.context.clearRect(0, 0, this.canvas.width, this.canvas.height)

      for (const row of this.snakeArr) {
        for (const { snakeOnIt, x, y } of row) {
          if (snakeOnIt) {
            this.context.fillRect(x, y, this.squareWidth, this.squareWidth)
          }
        }
      }

      this.snakeArr[this.headIndex.y][this.headIndex.x].snakeOnIt = false
      this.handlePosition()
      this.snakeArr[this.headIndex.y][this.headIndex.x].snakeOnIt = true
      this.start = Date.now()
    }

    requestAnimationFrame(this.move.bind(this))
  }

  public test() {
    this.snakePositions.push({ x: this.x, y: this.y })
    this.snakePositions.forEach(({ x, y }, i) => {
      console.log({ index: i, x, y })
    })
  }

  public changeDirection(direction: DIRECTION) {
    this.direction = direction
  }

  public handlePosition() {
    switch (this.direction) {
      case DIRECTION.TOP:
        this.handleTopPosition()
        break;
      case DIRECTION.BOTTOM:
        this.handleBottomPosition()
        break
      case DIRECTION.LEFT:
        this.handleLeftPosition()
        break
      case DIRECTION.RIGHT:
        this.handleRightPosition()
    }
  }

  handleTopPosition() {
    const nextHeadColumnIndex = this.headIndex.y - 1 >= 0
      ? this.headIndex.y - 1
      : this.snakeArr.length - 1
    this.headIndex.y = nextHeadColumnIndex
  }

  handleBottomPosition() {
    const nextHeadColumnIndex = (this.headIndex.y + 1) % this.rowCells
    this.headIndex.y = nextHeadColumnIndex
  }

  handleLeftPosition() {
    const nextHeadRowIndex = this.headIndex.x - 1 >= 0
      ? this.headIndex.x - 1
      : this.snakeArr[this.headIndex.y].length - 1
    this.headIndex.x = nextHeadRowIndex
  }

  handleRightPosition() {
    const nextHeadRowIndex = (this.headIndex.x + 1) % this.rowCells
    this.headIndex.x = nextHeadRowIndex
  }
}