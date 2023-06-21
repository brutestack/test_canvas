import { fabric } from 'fabric'

import type { Component } from './type'
// import ComponentUICanvasFabricClass from './ComponentUICanvasFabricClass'
import PositionManager from './PositionManager'

/**
 * Canvas layer
 */
class ViewCanvasFabricDashboard {
  height: number
  width: number
  containerEl: HTMLCanvasElement
  canvas: fabric.Canvas

  components: Component[]
  movedComponents: Component[]
  positionManager: PositionManager

  constructor(height: number, width: number) {
    this.components = []
    this.width = width
    this.height = height

    this.movedComponents = []
    this.positionManager = new PositionManager({
      viewWidth: this.width,
      viewHeight: this.height,
    })

    this.containerEl = document.createElement('canvas')
    this.containerEl.width = this.width
    this.containerEl.height = this.height
    this.containerEl.style.border = '1px solid red'

    this.canvas = new fabric.Canvas(this.containerEl)
  }

  getCanvas(): fabric.Canvas {
    return this.canvas
  }

  addComponent(component: Component) {
    this.components.push(component)
  }

  start() {
    // clear all
    // this.canvas.clear()

    this.components.forEach((component) => {
      component.draw(0)
    })

    this.canvas.renderAll()

    this.updateComponentsCount()

    return this.containerEl
  }

  updateComponentsCount() {
    const countEl = document.getElementById('componentCount') as HTMLElement
    countEl.innerText = this.components.length.toString()
  }

  /**
   * Start move test
   * All components be moved progrmatically
   */
  moveTest(movedComponentsCount = 0) {
    console.log('// TODO Momve test ', movedComponentsCount)
    /* this.movedComponents = this.components
    if (movedComponentsCount !== 0) {
      // 0 - means all components
      this.movedComponents = this.components.slice(0, movedComponentsCount)
    }
    this.movedComponents.forEach((component) => {
      const el = component.getUIElement() as ComponentUIRawCanvasClass

      this.positionManager.addPosition(el.x, el.y)
    })

    this.moveElements() */
  }

  /* moveElements() {
    for (let i = 0; i < this.movedComponents.length; i++) {
      // update position
      const [x, y] = this.positionManager.calculateNextPosition(i)

      // set new position
      const el = this.movedComponents[i].getUIElement() as ComponentUIRawCanvasClass
      el.move(x, y)
    }

    requestAnimationFrame(() => this.moveElements()) // Continue moving element in the next frame
  } */

  zoomTransform(zoom: number): void {
    this.containerEl.style.transform = `scale(${zoom})`
  }
}

export default ViewCanvasFabricDashboard
