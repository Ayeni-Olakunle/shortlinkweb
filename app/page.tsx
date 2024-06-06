"use client";

import axios from "axios";
import { useState } from "react";

export default function Home() {
  const [link, setLink] = useState<string>("");
  const [link2, setLink2] = useState<string>("");
  const [load, setLoad] = useState<boolean>(false);
  const [copy, setCopy] = useState<boolean>(false);

  const postRequest = (e: any) => {
    e.preventDefault();
    setLoad(true);

    const options = {
      url: "https://shortlink-virid.vercel.app/",
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json;charset=UTF-8",
      },
      data: {
        originalUrl: link,
      },
    };

    axios(options)
      .then((response) => {
        setLoad(false);
        setLink("");
        console.log(response.data.shortUrl);
        setLink2(
          `https://shortlink-virid.vercel.app/${response.data.shortUrl}`
        );
      })
      .catch((err) => {
        setLoad(false);
        setCopy(false);
        alert("Opps something went wrong or link already exist");
      });
  };
  return (
    <main className="w-full h-screen flex justify-center items-center">
      <div className="w-1/2 flex justify-center items-center flex-col gap-[30px]">
        <h1 className="text-[25px] font-bold">
          Shorten your links with link shortener
        </h1>
        <form
          className="w-full flex justify-center items-center gap-[30px]"
          onSubmit={postRequest}
        >
          <input
            type="url"
            className="border-[1px] border-solid border-[#e0e0e0] [box-shadow:5px_5px_5px_#e0e0e0,_-5px_-5px_5px_#e0e0e0] w-4/5 p-[15px] rounded-[50px] outline-[0]"
            value={link}
            onChange={(e) => setLink(e.target.value)}
          />
          <button
            type="submit"
            className="w-1/5 p-[15px] rounded-[50px] bg-[#3F51B5] text-[white] font-medium"
          >
            {load ? "Please wait..." : "Submit"}
          </button>
        </form>

        {link2 !== "" && (
          <div className="w-full flex justify-center items-center flex-col gap-[10px]">
            <h1 className="text-[20px] font-bold text-[#009688]">
              Copy your new shortened link
            </h1>
            <div className="border-[1px] border-solid border-[#e0e0e0] [box-shadow:5px_5px_5px_#e0e0e0,_-5px_-5px_5px_#e0e0e0] px-[17px] py-[10px] w-full flex justify-between items-center rounded-[50px]">
              <p>{link2}</p>
              <div className="flex justify-center items-center gap-[10px]">
                <a
                  href={link2}
                  target="_blank"
                  className="p-[15px] rounded-[50px] bg-[#009688] text-[white] font-medium px-[30px] py-[15px]"
                >
                  Open
                </a>
                <button
                  className="p-[15px] rounded-[50px] bg-[#3F51B5] text-[white] font-medium px-[30px] py-[15px]"
                  onClick={() => {
                    setCopy(true);
                    navigator.clipboard.writeText(link2);
                  }}
                >
                  {copy ? "Copied" : "Copy"}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
