
import Logo from '../../assets/Logo.png';
import { Link } from 'react-router-dom';
import { ReactElement } from 'react';

interface NavbarInterface {
  buttons: ReactElement[];
}

function Navbar(props: NavbarInterface) {


  return (
    <>
      <div className="flex items-center p-2 justify-between bg-gray-100 w-full top-0 h-20  left-0 right-0 fixed">
        <div className="flex items-center">
          <img src={Logo} className="h-14 ml-2" alt="Logo" />
          <Link to="/">
            <h3 className="ml-3 text-3xl">Second Brain</h3>
          </Link>
        </div>
        <div className="mr-5 flex gap-2">
          {props.buttons.map((button, idx) => (
            <span key={idx}>{button}</span>
          ))}
        </div>
      </div>
    </>
  );
}

export default Navbar;
