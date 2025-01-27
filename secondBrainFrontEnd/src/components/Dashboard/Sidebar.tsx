import Twitter from "../../assets/Twitter"
import ListItem from "./ListItem"
import Documenticon from "../../assets/Documenticon"
import Video from "../../assets/Video"
import Logouticon from "../../assets/Logouticon"
import { useNavigate } from "react-router-dom"

function Sidebar() {
  const navigate = useNavigate()

  function handleLogout() {
    localStorage.removeItem("token")
    navigate("/login")
  }

  return (
    <div className=" border-r-2 border-brown-100 w-1/5 h-fulp-4 shadow-sm bg-gray-100 h-screen ">
      <ListItem 
        icon={<Twitter />}
        title="Twitter"
      />
      <ListItem 
        icon={<Documenticon />}
        title="Documents"
      />
      <ListItem 
        icon={<Video />}
        title="Youtube"
      />
      <ListItem 
        icon={<Logouticon />}
        title="Log Out"
        onClick={handleLogout} 
      />
    </div>
  )
}

export default Sidebar
