import { VFC } from "react";

const Select:VFC<{options: {name: string}[], onChange: (index: number)=>void}> = ({options, onChange}) => {
  return (
    <select onChange={(e)=>{onChange(parseInt(e.currentTarget.value))}}>
      {
        options.map((option, i) => 
        <option key={i} value={i}>{option.name}</option>
        )
      }
    </select>
  )
}

export default Select