import Header from './components/Header';
import { Outlet } from "react-router-dom";

function App() {
  return (
    <div className="bg-white m-4 md:mx-8">
      <Header />
      <Outlet />
    </div>
  );
}

export default App;
