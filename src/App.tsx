import { Suspense, useEffect, useRef, useState, VFC } from "react";
import { filters } from "./filters";
import ImageDataView from "./ImageDataView";
import ImageInput from "./ImageInput";
import { applyFilter, getImageData, getScale } from "./lib";
import Select from "./Select";

const App:VFC = () => {
  const [imageData, setImageData] = useState<ImageData>()
  const [filterIndex, setFilterIndex] = useState(0)
  const filtered = imageData && applyFilter(imageData, filters[filterIndex].filter)
  const {width, height} = imageData ?? {width: undefined, height: undefined}
  const scale = width && height && getScale(width, height, 300)
  return (
    <div>
      <ImageInput onLoad={({image}) => {setImageData(getImageData(image))}} />
      <br />
      <span>フィルター：</span>
      <Select options={filters} onChange={i => setFilterIndex(i)} />
      <br />
      {width && height && scale && <div>width: {width}, height: {height}, scale: {Math.round(scale * 100)}%</div>}
      {filtered && width && height && scale &&
        <Suspense fallback={null}>
          <ImageDataView imageData={filtered} width={width * scale} height={height * scale} />
        </Suspense>
      }
      <br />
    </div>
  )
}

export default App