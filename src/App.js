import "./App.css";
import WrapToDoListComponent from "./component/wrap-to-do-list/WrapToDoListComponent/WrapToDoListComponent";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import PhotoWithApiComponent from "./component/photo-with-api/PhotoWithApiComponent/PhotoWithApiComponent";

function App() {
  return (
    <>
      <Router>
        <div>
          <div class="d-grid gap-2 d-md-flex justify-content-md-start">
            <Link to={`/`} class="btn btn-primary me-md-2" type="button">
              To do list
            </Link>
            <Link to={`/photos`} class="btn btn-primary me-md-2" type="button">
              Photos in API
            </Link>
          </div>
        </div>
        <Routes>
          <Route exact path="/" element={<WrapToDoListComponent />}></Route>
          <Route
            exact
            path="/photos"
            element={<PhotoWithApiComponent />}
          ></Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
