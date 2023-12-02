import { useState } from "react";
import state from "./States";
import { useSnapshot } from "valtio";
const Audio = () => {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
  };

  const handleUpload = () => {
    // Implement your upload logic here using selectedFile
    console.log("Selected file:", selectedFile);
    // You can use APIs like FormData to send the file to a server
  };
  const snap = useSnapshot(state);
  return (
    <div className="flex flex-col items-center h-[90%] relative bottom-14 cursor-pointer justify-center space-y-4">
        <p className="text-white text-xl pl-12 pr-12">Enhance the quality of your podcast, generate sentiment analysis and get a thumbnail created just for you</p>
      <div className="flex items-center justify-start p-4 gap-3">
        <lable htmlFor={snap.title} className="text-2xl text-white font-mono">
          Title
        </lable>
        <input
          value={snap.title}
          onChange={(e) => (state.title = e.target.value)}
          className="w-20 bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 cursor-pointer dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
        />
      </div>
      <div
        className="w-48 h-48 bg-blue-300 bg-opacity-30 rounded-lg p-4 relative"
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

      {/* {selectedFile && (
        <div className="text-center">
          <p className="text-blue-700">{selectedFile.name}</p>
          <button
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
            onClick={handleUpload}
          >
            Upload
          </button>
        </div>
      )} */}
    </div>
  );
};

export default Audio;
