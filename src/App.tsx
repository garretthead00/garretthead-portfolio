//import Banner from "./features/Banner/Banner";
//import About from "./features/About/About";
//import Contact from "./features/Contact/Contact";
import NavBar from "./components/NavBar";
//import Resume from "./features/Resume/Resume";

import { About, Banner, Contact, Resume } from "./features";

const App = () => {
  return (
    <div className="overflow-hidden bg-site bg-cover bg-no-repeat">
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
