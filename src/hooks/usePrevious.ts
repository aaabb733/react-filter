import { useEffect, useRef } from "react"

let isFirst = true

const usePrevious = <T>(value: T) => {
  const ref = useRef(value)
  useEffect(() => {
    ref.current = value
  })
  if (isFirst) {
    isFirst = false
    return null
  } else {
    return ref.current
  }
}

export default usePrevious