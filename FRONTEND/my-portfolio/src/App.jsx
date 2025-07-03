import { Outlet } from "react-router-dom";
import { Toaster } from "./components/Toaster";

function App() {
  return (
    <>
      <Toaster />
      <Outlet />
    </>
  );
}

export default App;
