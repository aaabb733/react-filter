import { ImgHTMLAttributes, VFC } from "react";
import useImageDataToURL from "./hooks/useImageDataToURL";

const ImageDataView:VFC<{imageData: ImageData} & ImgHTMLAttributes<HTMLImageElement>> = ({imageData, ...imgAttrs}) => {
  console.log('Render: ImageDataView')
  const url = useImageDataToURL(imageData)
  return (
    <img src={url} {...imgAttrs} />
  )
}

export default ImageDataView