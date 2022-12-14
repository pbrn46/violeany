import React from 'react'


const View = (props) => {
  return (
    <div className={(props.simulateMode ? "tw-text-right " : "tw-text-center ") + "ViolinDisplay tw-border tw-border-black"}>
      <svg className="ViolinDisplay"
        width={props.dims.SVG_WIDTH} height={props.dims.SVG_HEIGHT}>
        {props.children}
      </svg>
    </div>
  )
}

export default View
