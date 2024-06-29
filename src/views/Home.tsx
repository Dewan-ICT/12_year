/* eslint-disable @typescript-eslint/no-explicit-any */
import { SVGProps, useRef, useState } from "react";
import Banner from "../components/Banner";
import ImgUploader from "../components/ImgUploader";
// @ts-expect-error skip
import domtoimage from "dom-to-image";
const Home = () => {
  const [profilePicture, setProfilePicture] = useState(null);
  const divRef = useRef<HTMLDivElement>(null);
  const divRef2 = useRef<HTMLDivElement>(null);

  const [name, setName] = useState("");
  const [message, setMessage] = useState(
    "সেই ২০১৩ সাল থেকে দেখছি দেওয়ান আইসিটি’র সফলতা! দেখতে দেখতে আজ এক যুগে পদার্পণ। এই পথচলায় দেওয়ান আইসিটি পরিবারের সবাইকে অনেক অনেক শুভেচ্ছা ও অভিনন্দন।"
  );

  const handleDownload = (divRef: any) => {
    if (divRef.current) {
      try {
        const options: domtoimage.ToBlobOptions = {
          width: divRef.current.offsetWidth * 4, // Double the width for higher resolution
          height: divRef.current.offsetHeight * 4, // Double the height for higher resolution
        };
        divRef.current.style.transform = `scale(${4})`;
        divRef.current.style.transformOrigin = "top left";
        setTimeout(() => {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          domtoimage.toBlob(divRef.current, options).then(function (blob: any) {
            // Create a temporary anchor element to trigger the download
            const link = document.createElement("a");
            link.download = "Dewan ICT Post.jpg"; // Download as PNG, adjust as needed
            link.href = URL.createObjectURL(blob);
            if (divRef.current) {
              divRef.current.style.transform = "";
              divRef.current.style.transformOrigin = "";
            }
            link.click();
          });
        }, 1000);
      } catch (error) {
        console.error("Error capturing div content:", error);
      }
    }
  };

  return (
    <div className="font-sb min-h-screen w-full relative">
      <Banner />
      {/* profile  */}
      <div className="w-full relative p-3 max-w-6xl bg-slate-100 mx-auto rounded-md">
        <p className="text-2xl  text-red-700  ">
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
                  onClick={() => {
                    handleDownload(divRef);
                  }}
                  className="w-full rounded-md mt-5 text-white  grbg text-xl py-4 max-w-[350px]"
                >
                  ডাউনলোড করুন
                </button>
              </>
            )}
          </div>
        </div>
        <h1 className="text-2xl grbg text-white p-5  text-center rounded-md mt-10">
          দেওয়ান আইসিটি ইন্সটিটিউটকে জানাতে পারেন আপনার শুভেচ্ছা-কথা
        </h1>
        <div className="w-full relative pt-10 flex flex-col md:flex-row justify-between gap-2">
          <div className="w-full">
            <h1> নাম এবং শুভেচ্ছাবার্তা লিখে ছবিটি ডাউনলোড করে শেয়ার করুন।</h1>
            <div className="flex mt-3 justify-start flex-col">
              <label htmlFor="name" className="text-xl  text-gray-800">
                আপনার নাম লিখুন (বাংলায়)
              </label>
              <input
                type="text"
                id="name"
                onChange={(e) => {
                  setName(e.target.value);
                }}
                value={name}
                className="bg-slate-100 p-3 border-[5px] pt-1 outline-none  border-red-300 rounded-md"
                placeholder="আপনার নাম লিখুন"
              />
            </div>
            <div className="flex mt-5 justify-start flex-col">
              <label htmlFor="message" className="text-xl  text-gray-800">
                শুভেচ্ছাবার্তা লিখুন (বাংলায়)
              </label>
              <textarea
                onChange={(e) => {
                  setMessage(e.target.value);
                }}
                rows={5}
                id="message"
                value={message}
                className="bg-slate-100 p-3 border-[5px] pt-1 outline-none  border-red-300 rounded-md"
              ></textarea>
            </div>
          </div>
          <div className="w-full relative flex justify-center items-center flex-col">
            <div className="bg-white relative w-[350px] shadow-xl overflow-hidden">
              <div
                ref={divRef2}
                className="bg-white relative w-[350px] shadow-xl"
              >
                <img
                  src="/pb.png"
                  className="w-full relative top-0 left-0"
                  alt=""
                />
                {profilePicture && (
                  <img
                    src={
                      profilePicture ? URL.createObjectURL(profilePicture) : ""
                    }
                    className="absolute bg-white  top-[40px] left-[20px] h-[180px] w-[180px] rounded-full z-20 "
                  />
                )}
                <img
                  src="/pf.png"
                  className="w-full z-50 absolute top-0 left-0"
                  alt=""
                />
                <p className="absolute top-[245px] leading-4 w-full text-sm font-extralight p-3 font-sb">
                  {message}
                </p>
                <p className="font-sb absolute bottom-0 p-3 text-right w-full text-lg">
                  {name}
                </p>
              </div>
            </div>
            {profilePicture && (
              <>
                <button
                  onClick={() => {
                    handleDownload(divRef2);
                  }}
                  className="w-full rounded-md mt-5 text-white  grbg text-xl  py-4 max-w-[350px]"
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

export function MajesticonsImagePhotographyLine(
  props: SVGProps<SVGSVGElement>
) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 24 24"
      {...props}
    >
      <g
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      >
        <path d="M7 8c-.5 0-1.5.3-1.5 1.5S6.5 11 7 11m-5 6v3a2 2 0 0 0 2 2v0h11M2 17V6a2 2 0 0 1 2-2h3M2 17c1.403-.234 3.637-.293 5.945.243M15 22h3a2 2 0 0 0 2-2v-6m-5 8c-1.704-2.768-4.427-4.148-7.055-4.757m0 0c1.095-1.268 2.73-2.45 5.096-3.243M10 10V5a1 1 0 0 1 1-1h1l2-2h4l2 2h1a1 1 0 0 1 1 1v5a1 1 0 0 1-1 1H11a1 1 0 0 1-1-1"></path>
        <circle cx="16" cy="7" r="1"></circle>
      </g>
    </svg>
  );
}
