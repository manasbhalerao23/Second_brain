
import Dashboard from "./pages/dashboard"
import Home from "./pages/Home"
import Signin from "./components/signin"
import Signup from "./components/signup"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import { RecoilRoot } from "recoil"

function App() {
  return <RecoilRoot>
            <BrowserRouter>
                <Routes>
                  <Route path="/" element={<Home/>}/>
                  <Route path="/login" element={<Signin/>}/>
                  <Route path="/signup" element={<Signup/>}/>
                  <Route path="/signin" element={<Signin/>}/>
                  <Route path="/brain">
                    <Route index element={<Dashboard/>}/>
                    <Route path=":shareId" element={<Dashboard/>}/>
                  </Route>
                </Routes>
          </BrowserRouter>
  </RecoilRoot>
  return 
}
export default App
