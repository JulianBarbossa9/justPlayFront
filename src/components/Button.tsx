

interface ButtonProps {
  text: string
  onClick: () => void
}

const Button = (props: ButtonProps) => {
  return (
    <div className='p-5'>
      <button type="button" className='py-2 px-8  rounded-xl font-bold text-slate-100 bg-mainlyButton' onClick={props.onClick}>{props.text}</button>
    </div>
  )
}

export default Button