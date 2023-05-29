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
  if (snake.x > canvasWidth) {
    snake.x = -squareWidth
  } else if (snake.x < -squareWidth) {
    snake.x = canvasWidth
  } else if (snake.y > canvasHeight) {
    snake.y = -squareWidth
  } else if (snake.y < -squareWidth) {
    snake.y = canvasHeight
  }

  context.clearRect(0, 0, canvasWidth, canvasHeight)
  context.fillRect(snake.x, snake.y, squareWidth, squareWidth)

  handleSnakePosition(snake.direction)

  // snake.y += speed
  console.log(snake.y)
  requestAnimationFrame(moveSquare)
}

function handleSnakePosition(snakeDirection: DIRECTION) {
  let nextPosition = null

  switch (snakeDirection) {
    case DIRECTION.TOP:
      snake.y -= snake.speed
      break;
    case DIRECTION.BOTTOM:
      snake.y += snake.speed
      break
    case DIRECTION.LEFT:
      snake.x -= snake.speed
      break
    case DIRECTION.RIGHT:
      snake.x += snake.speed
  }
}


moveSquare()
context.fillRect(rightLimit, snake.y, squareWidth, squareWidth)
