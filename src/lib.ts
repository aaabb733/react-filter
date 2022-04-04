const initCtx = () => {
  const ctx = document.createElement('canvas').getContext('2d')
  if (!ctx) throw Error('2d context error')
  return ctx
}

const getImageData = (image: HTMLImageElement) => {
  const {width, height} = image
  const ctx = initCtx()
  ctx.canvas.width = width
  ctx.canvas.height = height
  ctx.drawImage(image, 0, 0)
  return ctx.getImageData(0, 0, width, height)
}

const getScale = (width: number, height: number, maxSize: number) => {
  const larger = Math.max(width, height)
  const scale = maxSize < larger ? maxSize / larger : 1
  return scale
}

type Color = {r: number, g: number, b: number, a:number}
type Filter = ({imageData, x, y}: {imageData:ImageData, x: number, y:number})=>Color

const getUV = (imageData:ImageData, x: number, y: number) => {
  return {x: x / (imageData.width - 1), y: y / (imageData.height - 1)}
}

const sample = (imageData: ImageData, x: number, y: number) => {
  const i = (y * imageData.width + x) * 4
  return {
    r: imageData.data[i] / 255,
    g: imageData.data[i + 1] / 255,
    b: imageData.data[i + 2] / 255,
    a: imageData.data[i + 3] / 255,
  }
}

const sampleUV = (imageData: ImageData, x: number, y:number) => {
  const {width, height} = imageData
  const xi = Math.round(x * (width - 1))
  const yi = Math.round(y * (height - 1))
  const i = (yi * width + xi) * 4
  return {
    r: imageData.data[i] / 255,
    g: imageData.data[i + 1] / 255,
    b: imageData.data[i + 2] / 255,
    a: imageData.data[i + 3] / 255,
  }
}

const applyFilter = (imageData: ImageData, filter: Filter) => {
  console.log('apply Filter')
  const {width, height} = imageData
  const newImageData = new ImageData(width, height)
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const i = (y * width + x) * 4
      const {r, g, b, a} = filter({imageData, x, y})
      newImageData.data[i] = r * 255
      newImageData.data[i + 1] = g * 255
      newImageData.data[i + 2] = b * 255
      newImageData.data[i + 3] = a * 255
    }
  }
  return newImageData
}

export {initCtx, getImageData, getScale, getUV, sample, sampleUV, applyFilter}
export type {Color, Filter}