import './style.css'
import { DIRECTION } from "./types"
import { Snake } from "./Snake"

const horizontalPosition = 0
const snakeSpeed = 20
const squareWidth = 20

const snake = new Snake(
  horizontalPosition,
  DIRECTION.RIGHT,
  snakeSpeed,
  squareWidth
)

document.addEventListener("keydown", handleKeyDown)

function handleKeyDown({ key }: KeyboardEvent) {
  switch (key) {
    case "ArrowRight": {
      if (snake.direction !== DIRECTION.LEFT) {
        snake.direction = DIRECTION.RIGHT
      }
      break
    }
    case "ArrowLeft": {
      if (snake.direction !== DIRECTION.RIGHT) {
        snake.direction = DIRECTION.LEFT
      }
      break
    }
    case "ArrowUp": {
      if (snake.direction !== DIRECTION.BOTTOM) {
        snake.direction = DIRECTION.TOP
      }
      break;
    }
    case "ArrowDown": {
      if (snake.direction !== DIRECTION.TOP) {
        snake.direction = DIRECTION.BOTTOM
      }
      break;
    }
    case "Enter": {
      snake.eat()
      break
    }
    case "a": {
      snake.addFood()
    }
  }
}

requestAnimationFrame(snake.move.bind(snake))
