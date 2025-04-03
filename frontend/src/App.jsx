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
import {Toaster} from "react-hot-toast";
import CaterHome from "./pages/caterApp/CaterHome/CaterHome";
import { createClient } from '@supabase/supabase-js'
import { useEffect, useState } from "react";
import useSupaBase from "./contextProvider";

const supabase = createClient( process.env.REACT_APP_SUPABASE_PROJECT, process.env.REACT_APP_SUPABASE_ANONKEY)

function App() {
  const [session, setSession] = useState(null)
  const [loading, setloading] = useState(true);
  const setSupaObj = useSupaBase((state) => state.setSupaObj);
  
  useEffect(() => {
    const syncit = async()=>{
      await supabase.auth.getSession().then(({ data: { session } }) => {
        setSession(session)
      })
      const {
        data: { subscription },
      } = supabase.auth.onAuthStateChange((_event, session) => {
        setSession(session)
      })
      setloading(false);
      return () => subscription.unsubscribe()
    }
    syncit();
  }, [])

  setSupaObj(supabase);
  

  if(!loading){
    if (!session) {
      return (
        <div>
            <Router>
              <Login />
              <Toaster/>
            </Router>
        </div>
      );
    }
    else {
    return (
      <AuthProvider>
        <Router>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/home" element={<Home />} />
            <Route
              path="/cater/:catername"
              element={<Cater/>}
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
  }
}

export default App;
