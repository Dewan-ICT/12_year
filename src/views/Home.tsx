import { useRef, useState } from "react";
import Banner from "../components/Banner";
import ImgUploader from "../components/ImgUploader";
// @ts-expect-error skip
import domtoimage from "dom-to-image";
const Home = () => {
  const [profilePicture, setProfilePicture] = useState(null);
  const divRef = useRef<HTMLDivElement>(null);

  const handleDownload = () => {
    if (divRef.current) {
      try {
        const options: domtoimage.ToBlobOptions = {
          width: divRef.current.offsetWidth * 4, // Double the width for higher resolution
          height: divRef.current.offsetHeight * 4, // Double the height for higher resolution
        };
        divRef.current.style.transform = `scale(${4})`;
        divRef.current.style.transformOrigin = "top left";

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        domtoimage.toBlob(divRef.current, options).then(function (blob: any) {
          // Create a temporary anchor element to trigger the download
          const link = document.createElement("a");
          link.download = "image.png"; // Download as PNG, adjust as needed
          link.href = URL.createObjectURL(blob);
          if (divRef.current) {
            divRef.current.style.transform = "";
            divRef.current.style.transformOrigin = "";
          }
          link.click();
        });
      } catch (error) {
        console.error("Error capturing div content:", error);
      }
    }
  };

  return (
    <div className="min-h-screen w-full relative">
      <Banner />
      {/* profile  */}
      <div className="w-full relative p-3 max-w-6xl bg-slate-100 mx-auto rounded-md">
        <p className="text-2xl  text-red-700 font-bold ">
          পছন্দের ফ্রেমে পরিবর্তন করুন আপনার ফেসবুক প্রোফাইল ছবি
        </p>
        {/* photo input  */}
        <div className="flex relative mt-10 w-full flex-col md:flex-row gap-3">
          <div className="w-full relative flex flex-col">
            <ImgUploader
              placeholder="আপনার ছবি দিন"
              onCrop={(_, p) => {
                console.log("🚀 ~ Home ~ p:", p);
                setProfilePicture(_);
              }}
            />
          </div>
          {/* preview download  */}
          <div className="w-full flex flex-col justify-center items-center">
            <div className="w-[350px] h-[350px] overflow-hidden">
              <div
                ref={divRef}
                className="w-[350px] h-[350px] bg-white border-2 relative shadow-md rounded-sm"
              >
                <img
                  src="/profile.png"
                  className="absolute z-20 top-0 left-0 w-full h-full"
                />
                {profilePicture && (
                  <img
                    src={
                      profilePicture ? URL.createObjectURL(profilePicture) : ""
                    }
                    className="relative bg-white z-10 top-0 left-0 w-full h-full"
                  />
                )}
              </div>
            </div>
            {profilePicture && (
              <>
                <button
                  onClick={handleDownload}
                  className="w-full rounded-md mt-5 text-white font-bold bg-red-600 text-xl font-bold py-4 max-w-[350px]"
                >
                  ডাউনলোড করুন
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
