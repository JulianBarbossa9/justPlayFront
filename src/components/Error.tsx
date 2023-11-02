import React from 'react'

interface Props {
  children?: React.ReactNode
}

const Error = (props: Props) => {
  return (
    <div className="bg-red-700 text-white text-center p-3 uppercase font-bold mb-3 rounded-md">{props.children}</div>
  )
}

export default Error