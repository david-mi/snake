import './style.css'
import { DIRECTION } from "./types"

const canvas = document.getElementById("canvas") as HTMLCanvasElement
const canvasHeight = 500
const canvasWidth = 500
canvas.width = canvasHeight
canvas.height = canvasWidth
const canvasVerticalCenter = canvasHeight / 2
const canvasHorizontalCenter = canvasWidth / 2
const squareWidth = 50
const rightLimit = canvasWidth - squareWidth

const context = canvas.getContext("2d")!

context.fillRect(0, canvasVerticalCenter, squareWidth, squareWidth)

const snake = {
  x: 0,
  y: canvasVerticalCenter,
  direction: DIRECTION.RIGHT,
  speed: 1
}

function moveSquare() {

  context.clearRect(0, 0, canvasWidth, canvasHeight)
  context.fillRect(snake.x, snake.y, squareWidth, squareWidth)
  handleSnakePosition()


  requestAnimationFrame(moveSquare)
}

function handleSnakePosition() {
  switch (snake.direction) {
    case DIRECTION.TOP:
      handleTopPosition()
      break;
    case DIRECTION.BOTTOM:
      handleBottomPosition()
      break
    case DIRECTION.LEFT:
      handleLeftPosition()
      break
    case DIRECTION.RIGHT:
      handleRightPosition()
  }
}

function handleTopPosition() {
  const nextPosition = snake.y - snake.speed
  const hasReachedTopEnd = nextPosition < -squareWidth

  snake.y = hasReachedTopEnd ? canvasHeight : nextPosition
}

function handleBottomPosition() {
  const nextPosition = snake.y + snake.speed
  const hasReachedBottomEnd = nextPosition > canvasHeight

  snake.y = hasReachedBottomEnd ? -squareWidth : nextPosition
}

function handleLeftPosition() {
  const nextPosition = snake.x - snake.speed
  const hasReachedLeftEnd = nextPosition < -squareWidth

  snake.x = hasReachedLeftEnd ? canvasWidth : nextPosition
}

function handleRightPosition() {
  const nextPosition = snake.x + snake.speed
  const hasReachedRightEnd = nextPosition > canvasWidth

  snake.x = hasReachedRightEnd ? -squareWidth : nextPosition
}


moveSquare()
context.fillRect(rightLimit, snake.y, squareWidth, squareWidth)
