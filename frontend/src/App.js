import logo from './logo.svg';
import './App.css';
import LoginSignup from './Components/LoginSignup/LoginSignup';
import ImageFirstPage from './Components/ImageFirstPage/Image';

function App() {
  return (
    <div className="app-container">
        {/* <div className='titlu'>
        SmartCity
      </div> */}
      <div className="box"> . 
         <LoginSignup />
       <ImageFirstPage /> 
      </div>
    </div>
  );
}

export default App;
