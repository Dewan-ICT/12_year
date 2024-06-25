const Footer = () => {
  return (
    <div className="w-full overflow-hidden px-5 relative mb-2 flex justify-between max-w-5xl mx-auto md:flex-row flex-col">
      <img
        src="/logo.png"
        alt="dewan ICT logo"
        className="h-20 w-auto object-contain md:h-20"
      />
      <div>
        <h1 className="w-full relative text-2xl font-bold">Dewan ICT</h1>
        <p className="text-sm font-thin">
          20-21(4th Floor), 374(3rd Floor), Mukto Bangla Complex (Lift-4),
          Mirpur-1 , Dhaka -1216, Bangladesh.
        </p>
      </div>
    </div>
  );
};

export default Footer;
