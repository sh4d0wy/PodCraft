import { useState } from "react";
import state from "./States";
import { useSnapshot } from "valtio";
import Enhance from "./Enhancer/Enhance";
import TTS from "./tts/tts";
import axios from "axios";

const Audio = () => {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    const file = (event.target.files[0]);
    setSelectedFile(selectedFile=>file)
  };

  const handleUpload = async (e)=>{
    e.preventDefault();
    state.loading = true;
    state.sentiment = "";
    const file = selectedFile;
    const formData = new FormData();
    formData.append("file", file);
    formData.append("model","whisper-1");
    formData.append("language","en");
    for (var key of formData.entries()) {
			console.log(key[0] + ', ' + key[1])
		}
    const result4 = await fetch('https://api.openai.com/v1/images/generations',{
      method:"POST",
      headers:{
        'Content-Type':"application/json",
        Authorization:`Bearer ${process.env.NEXT_PUBLIC_KEY}`
      },
      body:JSON.stringify({
        "model": "dall-e-3",
        "prompt": `Generate the thumbnail for a podcast titled ${snap.title}`,
        "n": 1,
        "size": "1024x1024"
      })
    })
    const json = await result4.json()
    state.imgSource = await json.data[0].url;

    const result2 = await fetch("https://api.openai.com/v1/audio/transcriptions",{
      headers:{
          Authorization:`Bearer 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`,
      },
      method:"POST",
      model:"whisper-1",
      body:formData
  })
  const data = await result2.json();
  const apiRequestBody = {
    model: "gpt-3.5-turbo",
    messages: [
      {
        role: "system",
        content:
          "You are a sentiment analysis generator who gives sentiments based on the text provided along with their scores. Choose from Positive,Negative or Neutral for sentiment analysis of the text and provide only 2 words answer for eg - 49% positive",
      },
      { role: "user", content: `provide the sentiment anaylysis of the given text ${data.text}`},
    ],
    temperature: 0.5,
  };
  const result3 = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization:
        "Bearer " + process.env.NEXT_PUBLIC_KEY,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(apiRequestBody),
  }).then((response)=>{
    response.json().then((data)=>{
      const text = data.choices[0].message.content;
      state.percentage = parseInt(text.split(" ")[0]);
      state.sentiment = text.split(" ")[1];
    })
  })
    
  }
  const snap = useSnapshot(state) ;
  return (
    <div className="flex flex-col items-center h-[90%] relative bottom-14 cursor-pointer w-100 justify-center space-y-4">
        <form encType="multipart/form-data" className="flex flex-col gap-4 items-center justify-center">
        <p className="text-white text-xl pl-10 pr-10 pt-10">Generate sentiment analysis and get a thumbnail created just for you</p>
      <div className="flex items-center justify-start p-4 gap-3">
        <label htmlFor={snap.title} className="text-2xl text-white font-mono">
          Title
        </label>
        <input
          value={snap.title}
          onChange={(e) => (state.title = e.target.value)}
          className="w-20 bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 cursor-pointer dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
        />
      </div>
      <div
        className="w-48 h-48 flex flex-col items-center justify-center bg-blue-300 bg-opacity-30 rounded-lg"
        onClick={() => document.getElementById("audio-upload").click()}
      >
        <svg
          className="w-16 h-16 mx-auto mb-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="white"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M16 13l-4 4m0 0l-4-4m4 4V7"
          />
        </svg>
        <p className="text-white text-xl font-mono text-center">Upload</p>
      </div>
      <input
        type="file"
        id="audio-upload"
        accept="audio/*"
        className="hidden"
        onChange={handleFileChange}
      />

      {selectedFile && (
        <div className="text-center">
          <p className="text-white bold p-3">{selectedFile.name}</p>
          <button
            className="select-none rounded-lg bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-gray-900/10 transition-all hover:shadow-lg hover:shadow-gray-900/20 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
            onClick={(e)=>handleUpload(e)}
          >
            Upload
          </button>
        </div>
      )}
      </form>
    </div>
  );
};

export default Audio;
