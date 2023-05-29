import { DIRECTION } from "./types";
import { Canvas } from "./Canvas";


export class Snake {
  canvas: HTMLCanvasElement
  context: CanvasRenderingContext2D
  y: number

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
  }

  public move() {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height)
    this.context.fillRect(this.x, this.y, this.squareWidth, this.squareWidth)
    this.handlePosition(this.canvas.height, this.canvas.width)

    requestAnimationFrame(this.move.bind(this))
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
    const nextPosition = this.y - this.speed
    const hasReachedTopEnd = nextPosition < -this.squareWidth

    this.y = hasReachedTopEnd ? canvasHeight : nextPosition
  }

  private handleBottomPosition(canvasHeight: number) {
    const nextPosition = this.y + this.speed
    const hasReachedBottomEnd = nextPosition > canvasHeight

    this.y = hasReachedBottomEnd ? -this.squareWidth : nextPosition
  }

  private handleLeftPosition(canvasWidth: number) {
    const nextPosition = this.x - this.speed
    const hasReachedLeftEnd = nextPosition < -this.squareWidth

    this.x = hasReachedLeftEnd ? canvasWidth : nextPosition
  }

  private handleRightPosition(canvasWidth: number) {
    const nextPosition = this.x + this.speed
    const hasReachedRightEnd = nextPosition > canvasWidth

    this.x = hasReachedRightEnd ? -this.squareWidth : nextPosition
  }
}