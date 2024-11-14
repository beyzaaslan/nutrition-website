import { BrowserRouter } from "react-router-dom";
import "./App.css";
import AppRouter from "./router";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <>
      <BrowserRouter>
      <ToastContainer /> 
        <AppRouter />
      </BrowserRouter>
    </>
  );
}
export default App;
