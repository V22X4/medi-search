import "./App.css";
import { Home } from "./pages/Home";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { InputPage } from "./pages/InputPage";
import { DiseasePage } from "./pages/DiseasePage";
import { UsagePage } from "./pages/UsagePage";
import { Prescription } from "./pages/Prescription/Prescription";
import LoginForm from "./pages/Login/Login";
import Signup from "./pages/Signup/Signup";
import { Provider } from "react-redux";
import RequestFeed from "./pages/RequestFeed/RequestFeed";
import OperatorFeed from "./pages/OperatorFeed/OperatorFeed";
import store from "./store";
import CreateAcc from "./pages/CreateAcc/CreateAcc";

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/diagnosis" element={<InputPage />} />
          <Route path="/disease-list/:id" element={<DiseasePage />} />
          <Route path="/usage" element={<UsagePage />} />
          <Route path="/prescription/:prescriptionId/:disease" element={<Prescription />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/join" element={<CreateAcc />} />
          <Route path="/allreq" element={<RequestFeed />} />
          <Route path="/operatorfeed" element={<OperatorFeed />} />
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;
