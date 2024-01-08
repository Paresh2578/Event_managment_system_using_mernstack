import { ReactComponent as LogoDark } from "../assets/images/logos/adminpro.svg";
import { Link } from "react-router-dom";

const Logo = () => {
  return (
    <Link to="/admin/dashboard">
      EventX
      {/* <LogoDark /> */}
    </Link>
  );
};

export default Logo;
