//import Banner from "./features/Banner/Banner";
//import About from "./features/About/About";
import Projects from "./components/Projects";
//import Contact from "./features/Contact/Contact";
import NavBar from "./components/NavBar";
//import Resume from "./features/Resume/Resume";

import {
  About,
  Banner,
  Contact,
  Resume
} from './features'

const App = () => {

  return (
    <div className="bg-site bg-no-repeat bg-cover overflow-hidden">
      <Banner />
      <About />
      <Resume />
      {/* <Projects /> */}
      <Contact />
      <NavBar />
    </div>
  );
};

export default App;
