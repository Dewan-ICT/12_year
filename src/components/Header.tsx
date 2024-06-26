import useWindowSize from "react-use/lib/useWindowSize";
import Confetti from "react-confetti";
import { useEffect, useState } from "react";

const Header = () => {
  const { width, height } = useWindowSize();
  const [number, SetNumber] = useState(500);

  useEffect(() => {
    setTimeout(() => {
      SetNumber(20);
    }, 2000);
  });
  return (
    <div className="w-full relative ">
      <Confetti numberOfPieces={number} width={width - 5} height={height} />
      <div className="w-full relative flex justify-between items-center px-3 md:max-w-7xl mx-auto">
        <a href="/">
          <img
            src="12.png"
            className="h-20 md:h-32"
            alt="dewan ict 12 year logo"
          />
        </a>
        <a href="https://dewanict.com/">
          <img
            src="logo.png"
            className="h-10 md:h-15 xl:h-20"
            alt="dewan ict 12 year logo"
          />
        </a>
      </div>
    </div>
  );
};

export default Header;
