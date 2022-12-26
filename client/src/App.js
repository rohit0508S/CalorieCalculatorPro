import { BrowserRouter, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

// import "./App.css";
import AddEdit from "./pages/AddEdit";
import Home from "./pages/Home";
import Today from "./pages/Today";
// import View from "./pages/View";
import PrivateRoute from "./pages/PrivateRoute";
import Login from "./pages/Login";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        {/* <ToastContainer position="top-center" /> */}
        <Routes>
          <Route path="/" element={<Login />} />
          <Route element={<PrivateRoute />}>
            <Route path="/home" element={<Home />} />
            <Route path="/addContact" element={<AddEdit />} />
            <Route path="/update/:id" element={<AddEdit />} />
            {/* <Route path="/view/:id" element={<View />} /> */}
            <Route path="/today" element={<Today />} />
          </Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
