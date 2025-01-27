import { useNavigate } from 'react-router-dom'
import Button from '../../Ui/Button'

function Intro() {
  const navigate = useNavigate();
  return (
    <div className='h-screen flex flex-col items-center justify-center bg-gray-100 space-y-8'>
        <p className='text-8xl text-wrap text-center'>Get your life organized with Second Brain.</p>
        <p className='text-base  tracking-wide'>Second Brain is an system that tracks your goals, projects, notes, and everything in between.</p>
        <div className='justify-center'>
        <Button 
            title='Sign Up'
            styleType='primary'
            size='md'
            onClick={()=>{navigate("/signup")}}
        />
        </div>
    </div>
  )
}

export default Intro