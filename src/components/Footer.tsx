const Footer = () => {
  return (
    <div className="w-full overflow-hidden px-5 pt-10 relative mb-2 flex justify-between max-w-5xl mx-auto md:flex-row flex-col">
      <a href="https://dewanict.com/">
        <img
          src="/logo.png"
          alt="dewan ICT logo"
          className="h-20 w-auto object-contain md:h-20"
        />
      </a>
      <div>
        <p className="flex gap-3 font-bold py-3 text-lg">
          <a href="tel:01976444303">+880 1976 444-303</a>
          <a href="https://dewanict.com/">www.dewanict.com</a>
        </p>
        <p className="text-sm font-thin">
          20-21(4th Floor), 374(3rd Floor), Mukto Bangla Complex (Lift-4),
          Mirpur-1 , Dhaka -1216, Bangladesh.
        </p>
      </div>
    </div>
  );
};

export default Footer;
