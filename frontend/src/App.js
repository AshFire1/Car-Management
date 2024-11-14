import {BrowserRouter,Routes,Route} from "react-router-dom"
import HomePage from "./pages/HomePage";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import CreateCar from "./pages/CreateCar";
import SearchPage from "./pages/SearchPage";
import CarDetails from "./pages/CarDetails";

function App() {
  return (
    <Provider store={store} >
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage/>}/>
        <Route path="/register" element={<RegisterPage/>}/>
        <Route path="/login"  element={<LoginPage/>}/>
        <Route path="/create-car" element={<CreateCar/>}/>
        <Route path="/search/:search" element={<SearchPage/>}/>
        <Route path="/cars/:carId" element={<CarDetails/>}/>
        
      </Routes>
      </BrowserRouter>
     
    </Provider>
  );
}

export default App;
