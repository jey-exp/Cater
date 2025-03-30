import logo from "./logo.svg";
import "./App.css";
import { Signin } from "./pages/Signin/Signin";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Login } from "./pages/Login/Login";
import Home from "./pages/Home/Home";
import Cater from "./pages/Cater/Cater";
import { DietPlan } from "./components";
import { AuthProvider } from "./authContext";
import LogintoContinue from "./pages/LogintoContinue/LogintoContinue";
import UserProfile from "./pages/UserProfile/UserProfile";
import CaterSignin from "./pages/caterApp/CaterSignin/CaterSignin"
import CaterLogin from "./pages/caterApp/CaterLogin/CaterLogin";
import toast,{Toaster} from "react-hot-toast";
import CaterHome from "./pages/caterApp/CaterHome/CaterHome";

function App() {
  const breakfast = [
    {
      name: "Idli",
      proteins: "3 Grams",
      fat: "1 Grams",
      calories: "39 Calories",
      price: "₹10",
    },
    {
      name: "Dosa",
      proteins: "5 Grams",
      fat: "2 Grams",
      calories: "100 Calories",
      price: "₹20",
    },
    {
      name: "Upma",
      proteins: "5 Grams",
      fat: "3 Grams",
      calories: "150 Calories",
      price: "₹20",
    },
    {
      name: "Chapati",
      proteins: "12 Grams",
      fat: "2 Grams",
      calories: "80 Calories",
      price: "₹20",
    },
    {
      name: "Sandwich(V)",
      proteins: "4 Grams",
      fat: "2 Grams",
      calories: "100 Calories",
      price: "₹30",
    },
  ];
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="" element={<Signin />} />
          <Route path="/login" element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route
            path="/cater/:catername"
            element={<Cater breakfast={breakfast} />}
          />
          <Route
            path="/dietplan/:catername"
            element={<DietPlan />}
          />
          <Route path="/profile" element={<UserProfile />} />
          <Route path="/notauthenticated" element={<LogintoContinue />} />
          <Route path="/caterapp/signin" element={<CaterSignin />} />
          <Route path="/caterapp/login" element={<CaterLogin/>}/>
          <Route path="/caterapp/home" element={<CaterHome/>} />
        </Routes>
      </Router>
      <Toaster />
    </AuthProvider>
  );
}

export default App;
