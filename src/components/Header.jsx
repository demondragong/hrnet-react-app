import { Link } from "react-router-dom";
import logo from "../hrnet-logo.png";

export default function Header() {
  return (
    <header className="flex flex-row justify-between items-center">
      <img src={logo} className="w-32" alt="logo" />
      <nav>
        <Link to="/">Home</Link> |{" "}
        <Link to="/employee-list">Employee list</Link>
      </nav>
    </header>
  );
}
