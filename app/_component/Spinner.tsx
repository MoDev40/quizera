import { Loader } from "lucide-react"

const Spinner = ({status}:{status:string}) => {
  return (
    <div className='flex space-x-2 justify-center mt-10'><Loader className='animate-spin'/><p>{status}</p></div>
  )
}

export default Spinner