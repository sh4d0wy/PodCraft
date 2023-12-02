"use client";
import { useSnapshot } from "valtio";
import state from "./States";
import Genai from "./Genai";
import  Audio  from "./Audio";
export default function Sidebar() {
  const snap = useSnapshot(state);

  async function handleChange(e) {
    state.title = e.target.value;
  }
  const handleClick = async () => {
    const data = await Genai({snap});
  };
  const handleRadioChange = async (e) => {
    state.guest = e.target.value;
  };
  const handleGuestName = (e) => {
    state.guestName = e.target.value;
  };
  const handleTone = (e) => {
    state.tone = e.target.value;
  };
  return (
    <>
      <div className="h-[95vh] absolute w-[25vw] opacity-50 left-10 top-5 z-100 bg-[#0E172B] outline rounded-md "></div>
      <div className="h-[95vh] w-[25vw] font-sans absolute left-10 top-5 z-1000 bg-none flex-col rounded-md flex gap-8 pt-10 place-items-center">
        <h1 className="text-4xl flex justify-start">PodCraft</h1>
        <div className="flex gap-3">
          {snap.flow==="script" ?(
            <>
            <button onClick={()=>state.flow="script"} className="p-2 outline outline-sky-600 text-white bg-gradient-to-tr from-gray-700 to-gray-900 rounded-lg">Script Generator</button>
            <button onClick={()=>state.flow="audio"} className="p-2 text-white text-white bg-gradient-to-tr from-gray-700 to-gray-900 rounded-lg">Audio Enhancer</button>
            </>
          ):
          <>
             <button onClick={()=>state.flow="script"} className="p-2 text-white bg-gradient-to-tr from-gray-700 to-gray-900 rounded-lg">Script Generator</button>
            <button onClick={()=>state.flow="audio"} className="p-2 outline outline-sky-600 text-white text-white bg-gradient-to-tr from-gray-700 to-gray-900 rounded-lg">Audio Enhancer</button>
          </>
          }
        </div>
        {snap.flow==="script" ? (
            <>
             <div className="input flex justify-center items-center gap-4">
             <label className="text-2xl pb-3">Title</label>
             <input
               type="text"
               className="w-20 mb-5 bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 cursor-pointer dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
               value={snap.title}
               onChange={(e) => handleChange(e)}
             ></input>
           </div>
           <div className="input flex gap-4">
             <label htmlFor="guest">Are guests coming?</label>
             <label htmlFor="guest">Yes</label>
             <input
               type="radio"
               name="guest"
               value="yes"
               className="w-5 h-5 "
               onChange={(e) => handleRadioChange(e)}
             ></input>
             <label htmlFor="guest">No</label>
             <input
               type="radio"
               name="guest"
               value="no"
               className="w-5 h-5"
               onChange={(e) => handleRadioChange(e)}
             ></input>
           </div>
           {snap.guest === "yes" && (
             <div className="input flex gap-8">
               <label>Guest Name</label>
               <input
                 type="text"
                 name="guest"
                 value={snap.guestName}
                 onChange={(e) => handleGuestName(e)}
                 className="w-20 mb-5 bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 cursor-pointer dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
               ></input>
             </div>
           )}
           <div className="input flex gap-8">
             <label>Select Tone</label>
             <select onChange={(e)=>handleTone(e)} className="mb-5 bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 cursor-pointer dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"required>
               <option value="formal">formal</option>
               <option value="informal">informal</option>
               <option value="journalistic">journalistic</option>
               <option value="educational">educational</option>
               <option value="story telling">story telling</option>
             </select>
           </div>
           
           <div className="input flex gap-8">
             <label>WordsCount</label>
             <input
               type="Number"
               name="language"
               className="w-20 mb-5 bg-gray-100 border-none border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 active:border-none block w-full p-2.5 cursor-pointer dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
               onChange={(e)=>state.count=e.target.value}
               required
             ></input>
           </div>
           <button className="select-none rounded-lg bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-gray-900/10 transition-all hover:shadow-lg hover:shadow-gray-900/20 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none" onClick={handleClick}>
             Generate
           </button>
            </>
        ):
        <Audio/>
        }
          </div>
        
    </>
  );
}
