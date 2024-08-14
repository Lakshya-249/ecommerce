import { Outlet } from "react-router-dom";
import "./App.css";
import { useEffect, useState } from "react";
import Header from "./BasicComponents/header";
import Header2 from "./BasicComponents/header2";

function App() {
  const [head, setHead] = useState<boolean>(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      // console.log("Scroll position:", scrollPosition);

      if (scrollPosition > 50) {
        setHead(true);
      } else {
        setHead(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return (
    <div className="w-full h-full bg-[#1a1a1a]">
      <Header head={head} />
      <Header2 head={head} />
      <Outlet />
    </div>
  );
}

export default App;
