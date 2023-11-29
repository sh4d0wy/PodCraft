"use client"
import { useSnapshot } from "valtio";
import state from "./States";
import Genai from "./Genai";
export default function Sidebar() {
    const snap = useSnapshot(state)

    async function handleChange(e){
        state.title = e.target.value;
    }
    const handleClick = async ()=>{
        const data = await Genai(snap.title);
        state.data = data;
    }

  return (
    <>
      <div className="h-[95vh] absolute w-[25vw] opacity-50 left-10 top-5 z-100 bg-[#0E172B] outline rounded-md "></div>
      <div className="h-[95vh] w-[25vw] absolute left-10 top-5 z-1000 bg-none flex-col rounded-md flex gap-8 pt-10 place-items-center">
        <h1 className="text-4xl font-mono">PodCraft</h1>
        <div className="input flex gap-8">
        <label>Title</label>
        <input type="text" className="w-20 outline" value={snap.title} onChange={(e)=>handleChange(e)}></input >
        </div>
        <button className="outline text-white w-50 h-20" onClick={handleClick}>Generate</button>
      </div>
    </>
  );
}
