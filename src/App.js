import Navbar from "./Components/Navbar";
import { Route, Routes} from 'react-router-dom'
import HomeScreen from "./Screens/HomeScreen";
import BookingScreen from "./Screens/BookingScreen";
import RegisterScreen from "./Screens/RegisterScreen";
import LoginScreen from "./Screens/LoginScreen";
import ProfileScreen from "./Screens/ProfileScreen";
function App() {
  return (
    <div className="App">
      <Navbar />
         <Routes>
        <Route path="/home" exact element={<HomeScreen />} />
        
                  <Route path="/book/:roomid/:fromdate/:todate" exact element={<BookingScreen/>} />
        <Route path="/register" exact element={<RegisterScreen />} />
        <Route path="/login" exact element={<LoginScreen />} />
       <Route path="profile" exact element={<ProfileScreen />} />

          </Routes>
    </div>
  );
}

export default App;
