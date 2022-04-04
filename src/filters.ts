import { Filter, getUV, sample, sampleUV } from "./lib";

const noneFilter:Filter = ({imageData, x, y}) => {
  return sample(imageData, x, y)
}

const grayScaleFilter:Filter = ({imageData, x, y}) => {
  const {r, g, b, a} = sample(imageData, x, y)
  const l = (r + g + b) / 3
  return {
    r: l,
    g: l,
    b: l,
    a: a
  }
}

const binaryFilter:Filter = ({imageData, x, y}) => {
  const {r, g, b, a} = sample(imageData, x, y)
  return {
    r: Math.round(r),
    g: Math.round(g),
    b: Math.round(b),
    a
  }
}

const grayScaleBinaryFilter:Filter = ({imageData, x, y}) => {
  const {r, g, b, a} = sample(imageData, x, y)
  const l = Math.round((r + g + b) / 3)
  return {r: l, g: l, b: l, a}
}

const posterizeFilter:Filter = ({imageData, x, y}) => {
  const steps = 6
  const color = sample(imageData, x, y)
  if (color.r === 1) {
    color.r -= Number.EPSILON
  }
  if (color.g === 1) {
    color.g -= Number.EPSILON
  }
  if (color.b === 1) {
    color.b -= Number.EPSILON
  }
  return {
    r: Math.floor(color.r * steps) / (steps - 1),
    g: Math.floor(color.g * steps) / (steps - 1),
    b: Math.floor(color.b * steps) / (steps - 1),
    a: color.a
  }
}

const reverseFilter:Filter = ({imageData, x, y}) => {
  const {r, g, b, a} = sample(imageData, x, y)
  return {
    r: 1 - r,
    g: 1 - g,
    b: 1 - b,
    a
  }
}

const flipXFilter:Filter = ({imageData, x, y}) => {
  const {width} = imageData
  return sample(imageData, width - 1 - x, y)
}

const flipYFilter:Filter = ({imageData, x, y}) => {
  const {height} = imageData
  return sample(imageData, x, height - 1 - y)
}

const mosaicFilter:Filter = ({imageData, x, y}) => {
  return sample(imageData, Math.floor(x / 20) * 20, Math.floor(y / 20) * 20)
}

const fract = (x: number) => {
  return x - Math.floor(x)
}

const tileFilter:Filter = ({imageData, x, y}) => {
  const uv = getUV(imageData, x, y)
  if (uv.x === 1) {
    uv.x = 0.99999
  }
  if (uv.y === 1) {
    uv.y = 0.99999
  }
  uv.x = fract(uv.x * 3)
  uv.y = fract(uv.y * 3)
  return sampleUV(imageData, uv.x, uv.y)
}

const noiseFilter:Filter = ({imageData, x, y}) => {
  if (Math.random() < 0.5) {
    return sample(imageData, x, y)
  } else {
    return {r: Math.random(), g: Math.random(), b: Math.random(), a: 1}
  }
}

const filters = [
  {name: 'なし', filter: noneFilter},
  {name: '白黒', filter: grayScaleFilter},
  {name: '二値化', filter: binaryFilter},
  {name: '白黒二値化', filter: grayScaleBinaryFilter},
  {name: 'ポスタライズ', filter: posterizeFilter},
  {name: '色反転', filter: reverseFilter},
  {name: '左右反転', filter: flipXFilter},
  {name: '上下反転', filter: flipYFilter},
  {name: 'タイル', filter: tileFilter},
  {name: 'モザイク', filter: mosaicFilter},
  {name: 'ノイズ', filter: noiseFilter},
]

export {filters}