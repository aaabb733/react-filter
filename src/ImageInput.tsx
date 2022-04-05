import { ChangeEventHandler, VFC } from "react"

type ImageInputProps = {
  onLoad({image, url}: {image: HTMLImageElement, url: string}):void
}
const ImageInput:VFC<ImageInputProps> = ({onLoad}) => {
  const onChange:ChangeEventHandler<HTMLInputElement> = (e) => {
    if (!e.target.files) throw Error('ImageInput target file error')
    if (e.target.files.length === 0) return
    const file = e.target.files[0]
    const url = URL.createObjectURL(file)
    const image = new Image()
    image.src = url
    image.onload = () => {onLoad({image, url})}
  }
  return (
    <input type="file" accept="image/*" onChange={onChange} />
  )
}

export default ImageInput