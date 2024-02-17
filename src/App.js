import Banner from "./components/Banner";
import About from "./components/About";
import Projects from "./components/Projects";
import Contact from "./components/Contact";
import NavBar from "./components/NavBar";
import Resume from "./components/Resume";

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
