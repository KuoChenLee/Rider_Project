/*import logo from './logo.svg';*/
import './App.css';
/*import Nav from 'react-bootstrap/Nav'*/
import 'bootstrap/dist/css/bootstrap.min.css';
import {
    Route,
    BrowserRouter as Router,
    Routes,
    Link
} from "react-router-dom";
import {Container, Navbar, Row, NavbarBrand, Col, NavDropdown, Button} from "react-bootstrap";
import Home1 from './Anothor_Page/Home1';
import Home2 from './Anothor_Page/Home2';
import Home3 from "./Anothor_Page/Home3";
import Home4 from "./Anothor_Page/Home4";
function App() {
    const API_KEY='18efb17787794b2591cae98f583b4e4f';
    return (
        <div className="App">
            <div className="background1">
                <Router>
                    <Navbar scrolling dark expand="md" fixed="top">

                        <Container>
                            <NavbarBrand to="/"><h1  className='title1'>AI Kitchen</h1></NavbarBrand>
                            <Link className='text1' to="/Home1" ><button className='btn-87'>Home</button></Link>
                            <Link className='text1' to="/Home2" ><button className='btn-87'>Recipe</button></Link>
                            <Link className='text1' to="/Home3" ><button className='btn-87'>About</button></Link>
                            <Link className='text1' to="/Home4" ><button className='btn-87'>Instruction</button></Link>
                        </Container>



                    </Navbar>


                    <Routes>
                        {/* 路徑處理 */}
                        <Route exact path="*"  element={<Home1 API_KEY={API_KEY}/>}/>
                        <Route path="/Home2" element={<Home2/>} />
                        <Route path="/Home3" element={<Home3/>} />
                        <Route path="/Home4" element={<Home4/>} />
                    </Routes>
                </Router>


            </div>


        </div>
    );
}

export default App;
