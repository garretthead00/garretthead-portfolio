import NavBar from "./components/NavBar";
import { About, Banner, Contact, Resume } from "./features";

const App = () => {
  return (
    <div className="overflow-hidden bg-site bg-cover bg-no-repeat">
      <Banner />
      <About />
      <Resume />
      <Contact />
      <NavBar />
    </div>
  );
};

export default App;
