import { Link } from "react-router-dom";
import Icon from "./Icon.jsx";

export default function Header() {
  return (
    <header className="my-5 flex flex-row justify-between items-center">
      <Link to="/">
        <Icon />
      </Link>
      <nav>
        <Link to="/">Home</Link> |{" "}
        <Link to="/employee-list">Employee list</Link>
      </nav>
    </header>
  );
}
