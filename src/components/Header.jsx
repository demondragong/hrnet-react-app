import { Link, NavLink } from "react-router-dom";
import Icon from "./Icon.jsx";

export default function Header() {
  return (
    <header className="my-5 flex flex-row justify-between items-center">
      <Link to="/" aria-label="Home page">
        <Icon />
      </Link>
      <nav>
        <NavLink to="/">Home</NavLink> |{" "}
        <NavLink to="/employee-list">Employee list</NavLink>
      </nav>
    </header>
  );
}
