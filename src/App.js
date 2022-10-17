import Header from './components/Header';
import { Outlet } from "react-router-dom";
import { HelmetProvider } from 'react-helmet-async';

function App() {
  return (
    <HelmetProvider>
      <Header />
      <Outlet />
    </HelmetProvider>
  );
}

export default App;
