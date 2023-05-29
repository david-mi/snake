export class Canvas {
  canvas: HTMLCanvasElement
  context: CanvasRenderingContext2D
  verticalCenter: number

  constructor(public width: number, public height: number) {
    this.canvas = document.getElementById("canvas") as HTMLCanvasElement
    this.canvas.width = width
    this.canvas.height = height

    this.verticalCenter = this.width / 2
    this.context = this.canvas.getContext("2d")!
  }
}