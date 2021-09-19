import { Link } from "react-router-dom";

const Naviation = ({ userObj }) => (
  <nav>
    <ul>
      <li>
        <Link to="/">Home</Link>
      </li>
      <li>
        <Link to="/profile">{userObj.displayName}의 Profile</Link>
      </li>
    </ul>
  </nav>
);

export default Naviation;
