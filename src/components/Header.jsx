import { Link } from "react-router-dom";
import logo from "../hrnet-logo.png";

export default function Header() {
  return (
    <header className="header">
      <img src={logo} className="logo" alt="logo" />
      <nav>
        <Link to="/">Home</Link> |{" "}
        <Link to="/employee-list">Employee list</Link>
      </nav>
    </header>
  );
}
