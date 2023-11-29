"use client"
import axios from "axios";
export default async function Genai(title){
    try{
        const response = await axios.post(
        "https://generativelanguage.googleapis.com/v1beta2/models/text-bison-001:generateText?key=AIzaSyCfyhwbdirf9gpqfpnjMbbI12t0ujIRoMg",
        {
          prompt: {text:`Provide me the script of podcast along with a catchy title with the topic ${title}`},
        },
      );
      console.log(response.data.candidates[0].output)
      return response.data.candidates[0].output;
      }catch(e){
        console.error(e);
      }
      return "error occured"
}