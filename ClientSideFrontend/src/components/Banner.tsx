import React from "react";
import Image from "next/image";
import PaperBgImage from "../../public/paper-bg.jpg";
import bookImage from "../../public/book.png";

const Banner = () => {
  return (
    <>
      <div className="flex justify-center border-2 my-10 max-w-6xl items-center border-4 border-red-50 mx-auto">
        <div className="relative ">
          <Image
            src={PaperBgImage}
            alt={"paper background"}
            className=" h-[200px] rounded-xl"
          />
          <div>
            <span className="capitalize text-5xl tracking-tighter text-white font-bold absolute top-[20%] left-[4%]">
              Connect Share and Trade Your <br /> Favourite reads ...
            </span>
          </div>
          <Image
            src={bookImage}
            alt="bookImage"
            className="absolute w-[250px] h-[200px] right-[3%] top-0 "
          />
        </div>
      </div>
    </>
  );
};

export default Banner;
