import Navbar from '../Navbar/Navbar'
import Intro from './Intro'
import HowItWorks from './Features'
import Steps from './Steps'
import Button from '../../Ui/Button'
import { useNavigate } from 'react-router-dom'

function HomePage() {
  const navigate = useNavigate();
  return (
    <div>
        <Navbar 
          buttons={[<Button title="signup" styleType='primary' size='sm' onClick={()=>(navigate("/signup"))}/>,

          <Button title="Login" styleType='primary' size='sm' onClick={()=>(navigate("/login"))}/>

        ]}
        />
        <Intro />
        <HowItWorks />
        <Steps />
    </div>
  )
}

export default HomePage