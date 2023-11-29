"use client"
import { useSnapshot } from "valtio";
import state from "./States";
import Genai from "./Genai";
import Markdown from "react-markdown";
export default function Middle() {
    const snap = useSnapshot(state)
    var data = state.data;
  return (
    <>
      <div className="h-[95vh] absolute w-[60vw] opacity-50 z-100 top-5 right-24 bg-[#0E172B] outline rounded-md"></div>
      <div className="max-h-[95vh] overflow-scroll no-scrollbar absolute w-[60vw] p-10 z-100 top-5 right-24 text-white flex justify-center rounded-md">
        <div className="text-white leading-8 text-mono ">
          <Markdown>
            {data}
          </Markdown>
        </div>
      </div>
    </>
  );
}
