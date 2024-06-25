/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
// @ts-expect-error skip
import AvatarEditor from "react-avatar-editor";

import { Card, Flex, IconButton } from "@radix-ui/themes";
import { FC, useRef, useState } from "react";
import ImageUploading from "react-images-uploading";
interface PropI {
  placeholder: string;
  onCrop: (file: any, preview: any) => void;
}

const ImgUploader: FC<PropI> = ({ placeholder, onCrop = () => {} }) => {
  const [images, setImages] = useState([]);
  const [zoom, setZoom] = useState(2);

  const [previewImg, setPreviewImg] = useState("");
  const editorRef = useRef();

  const [FileToImage, SetFile] = useState<any>(null);

  const urlToFile = (url: string) => {
    const arr = url.split(",");
    // console.log(arr)
    // @ts-expect-error for ignored paths
    const mime = arr[0].match(/:(.*?);/)[1];
    const data = arr[1];

    const dataStr = atob(data);
    let n = dataStr.length;
    const dataArr = new Uint8Array(n);

    while (n--) {
      dataArr[n] = dataStr.charCodeAt(n);
    }

    const file = new File([dataArr], "File.jpg", { type: mime });
    onCrop(file, previewImg);
    SetFile(file);
  };

  const previewHandler = () => {
    if (editorRef.current && images) {
      // @ts-expect-error ignore this
      const canvas = editorRef.current.getImageScaledToCanvas();
      canvas.toBlob((blob: Blob | MediaSource) => {
        const previewURL = URL.createObjectURL(blob);
        setPreviewImg(previewURL);
        const url = canvas.toDataURL("image/jpeg");
        urlToFile(url);
      });
    }
  };

  const maxNumber = 1;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const onChange = (imageList: any) => {
    // data for submit
    // console.log(imageList, addUpdateIndex);
    setImages(imageList);
  };
  return (
    <div className="w-full relative">
      <div className="h-full w-full border-2 relative rounded-4 hover:shadow-xl shadow-black dark:shadow-white/5 border-dashed bg-red-600 text-white font-bold">
        <ImageUploading
          multiple
          value={images}
          onChange={onChange}
          maxNumber={maxNumber}
          dataURLKey="data_url"
        >
          {({
            imageList,
            onImageUpload,
            onImageRemoveAll,
            isDragging,
            dragProps,
          }) => (
            // write your building UI
            <div className="w-full relative h-full p-2">
              {imageList?.length && !FileToImage ? (
                imageList.map((image, index) => (
                  <div key={index} className="w-full h-full">
                    <div className="fixed z-[900] flex flex-col justify-center items-center top-0 left-0 w-full h-screen backdrop-blur-0 bg-white/50">
                      <Card className="bg-white">
                        <div className="w-[390px] h-[400px] relative flex justify-center items-center">
                          <AvatarEditor
                            ref={editorRef}
                            image={image["data_url"]}
                            width={700}
                            height={700}
                            border={25}
                            color={[255, 255, 255, 0.9]} // RGBA
                            scale={+zoom as unknown as number}
                            style={{
                              transform: "scale(0.5)",
                            }}
                          />
                          <img
                            src="/profile.png"
                            alt=""
                            className="absolute pointer-events-none w-[350px] top-10 mx-auto z-10 bottom-0"
                          />
                        </div>
                        <div className="mx-4 my-3">
                          <span className="text-black font-light">
                            Zoom করুন
                          </span>
                          <input
                            type="range"
                            value={zoom}
                            min={1}
                            max={3}
                            step={0.1}
                            aria-labelledby="Zoom"
                            onChange={(e: any) => {
                              setZoom(e.target.value);
                            }}
                            className="w-full"
                          />
                        </div>
                        <p className="p-2 text-black">
                          আপনের ছবিটি সঠিক জায়গায় বসিয়ে নিন{" "}
                        </p>
                        <div className="relative pb-3">
                          <button
                            type="button"
                            onClick={previewHandler}
                            className="w-full relative text-lg bg-red-500 text-white py-3"
                          >
                            ঠিক আছে
                          </button>
                        </div>
                      </Card>
                    </div>

                    <IconButton
                      type="button"
                      color="red"
                      onClick={() => {
                        onImageRemoveAll();
                        onCrop(null, null);
                      }}
                      className="absolute cursor-pointer -translate-x-3 -translate-y-3"
                    >
                      e
                    </IconButton>
                    <img
                      src={image["data_url"]}
                      className="w-full h-full rounded-4 object-cover"
                    />
                  </div>
                ))
              ) : FileToImage ? (
                <div className="w-full h-full relative">
                  <IconButton
                    type="button"
                    color="red"
                    onClick={() => {
                      onImageRemoveAll();
                      onCrop(null, null);
                      SetFile(null);
                      setPreviewImg("");
                    }}
                    className="cursor-pointer absolute"
                  >
                    ❌
                  </IconButton>

                  <p className="text-center">ছবিটি ডাউনলোড করে শেয়ার করুন।</p>
                </div>
              ) : (
                <Flex
                  style={isDragging ? { color: "red" } : undefined}
                  onClick={onImageUpload}
                  {...dragProps}
                  className="w-full  gap-[2px] cursor-pointer justify-center items-center flex-col"
                >
                  {placeholder}
                </Flex>
              )}
            </div>
          )}
        </ImageUploading>
      </div>
    </div>
  );
};

export default ImgUploader;
