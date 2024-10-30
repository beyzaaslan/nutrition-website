import { BrowserRouter } from "react-router-dom";
import "./App.css";
import AppRouter from "./router";
import {ToastContainer} from 'react-toastify';

function App() {
  return (
    <>
      <BrowserRouter>
        <AppRouter />
        <ToastContainer />
      </BrowserRouter>
    </>
  );
}
export default App;
