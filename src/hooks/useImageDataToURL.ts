import { initCtx } from "../lib"

const map = new Map<ImageData, string>()

const useImageDataToURL = (imageData: ImageData) => {
  if (!map.has(imageData)) {
    throw new Promise(res => {
      const ctx = initCtx()
      ctx.canvas.width = imageData.width
      ctx.canvas.height = imageData.height
      ctx.putImageData(imageData, 0, 0)
      ctx.canvas.toBlob(blob => {
        if (blob) {
          const url = URL.createObjectURL(blob)
          map.set(imageData, url)
          res(null)
        } else {
          throw Error('canvas toBlob error')
        }
      })
    })
  } else {
    return map.get(imageData)
  }
}

export default useImageDataToURL