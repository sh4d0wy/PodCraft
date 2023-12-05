"use client";
import { useSnapshot } from "valtio";
import state from "./States";
import Genai from "./Genai";
import Markdown from "react-markdown";
import React from "react";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import Image from 'next/image'
import BounceLoader from "react-spinners/DotLoader";

export default function Middle() {
  const snap = useSnapshot(state);
  var data = snap.data;
  var generating = snap.generating;
  const percentage = snap.percentage;
  if(snap.flow==="audio"){
    state.data="Upload Your Podcast File"
  }

  return (
    <>
      <div className="h-[95vh] absolute w-[60vw] opacity-50 z-100 top-5 right-24 bg-[#0E172B] outline rounded-md"></div>
      <div className="max-h-[95vh] overflow-scroll flex-col gap-10 w-100 h-100 items-center no-scrollbar absolute w-[60vw] p-10 z-100 top-5 right-24 text-white flex justify-center rounded-md">
        {!generating ? (<>
          <div className="text-white text-5xl leading-8 text-mono">
            {data}
          </div>
          {(snap.loading===true && snap.sentiment ==="")&&(
            <div class="flex flex-col items-center justify-around h-screen w-full mx-auto my-20 relative bottom-20">
             <BounceLoader color="cyan" size={100} />
             </div>
          )}
          {(snap.flow==="audio" && snap.sentiment!=="" )&&(
            <>
            <Image src={snap.imgSource} 
            width={250}
            height={250}
            alt='thumbnail'
            />
            <CircularProgressbar className="circle" value={percentage} text={`${percentage}%`} />
              <div className="text-white text-3xl leading-9 text-mono">
                {snap.sentiment}
              </div>
            </>
        )}
            </>
        ) : (
          <div className="text-white text-xl leading-8 text-mono">
            <Markdown>{data}</Markdown>
            
            {(snap.loading===true && snap.sentiment ==="")&&(
            <div class="flex flex-col items-center justify-around h-screen w-full mx-auto my-20 relative bottom-20">
             <BounceLoader color="cyan" size={100} />
             </div>
          )}
          {(snap.flow==="audio" && snap.sentiment!=="" )&&(
            <>
            <div className="w-100 flex flex-col justify-center items-center gap-5 h-100">
            <Image src={snap.imgSource} 
            width={250}
            height={250}
            alt='thumbnail'
            />
            <CircularProgressbar className="circle" value={percentage} text={`${percentage}%`} />
              <div className="text-white text-3xl leading-9 text-mono">
                {snap.sentiment}
              </div>
              </div>
          </> 
        )}
      </div>
      )}
      </div>
      </>
  )}
