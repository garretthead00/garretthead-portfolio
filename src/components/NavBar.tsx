import { BiHomeAlt, BiUser } from "react-icons/bi";
import { BsBriefcase, BsChatSquareText } from "react-icons/bs";
import { Link } from "react-scroll";

const NavBar = () => {
  return (
    <nav className="fixed bottom-2 z-50 w-full overflow-hidden lg:bottom-8">
      <div className="container mx-auto">
        <div className="mx-auto flex h-[96px] w-full max-w-[460px] items-center justify-between rounded-full bg-black/20 px-5 text-2xl text-white/50 backdrop-blur-2xl">
          <Link
            to="home"
            activeClass="active"
            smooth={true}
            spy={true}
            offset={-200}
            className="flex h-[60px] w-[60px] cursor-pointer items-center justify-center"
          >
            <BiHomeAlt />
          </Link>
          <Link
            to="about"
            activeClass="active"
            smooth={true}
            spy={true}
            className="flex h-[60px] w-[60px] cursor-pointer items-center justify-center"
          >
            <BiUser />
          </Link>
          <Link
            to="resume"
            activeClass="active"
            smooth={true}
            spy={true}
            className="flex h-[60px] w-[60px] cursor-pointer items-center justify-center"
          >
            <BsBriefcase />
          </Link>
          <Link
            to="contact"
            activeClass="active"
            smooth={true}
            spy={true}
            className="flex h-[60px] w-[60px] cursor-pointer items-center justify-center"
          >
            <BsChatSquareText />
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
