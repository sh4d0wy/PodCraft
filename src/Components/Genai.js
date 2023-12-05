"use client";
import axios from "axios";
import OpenAI from "openai";
import state from "./States";
const Genai = async ({ snap }) => {
  let string = ""
  state.generating=true;
  console.log(process.env.NEXT_PUBLIC_KEY)
  const openai = new OpenAI({
    apiKey: process.env.NEXT_PUBLIC_KEY,
    dangerouslyAllowBrowser: true,
  });
  if (snap.guest === "yes") {
    var prompt1 = `Provide me the script of a podcast on the topic ${snap.title} in ${snap.tone} tone  with word count upto ${snap.count} and generate questions for the guest ${snap.guestName} asking about their experiences in markdown  `;
  } else {
    var prompt1 = `Provide me the script of a podcast on the topic ${snap.title} in ${snap.tone} tone with word count upto ${snap.count} in markdown with propper styling of headings and text in markdown`;
  }
  try {
    const apiRequestBody = {
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content:
            "You are a script writer for podcasts and generate crisp and creative scripts",
        },
        { role: "user", content: prompt1 },
      ],
      temperature: 0.5,
      stream: true,
    };
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization:
          "Bearer " + process.env.NEXT_PUBLIC_KEY,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(apiRequestBody),
    });
    const reader = response.body.getReader();
    const decoder = new TextDecoder("utf-8");

    while (true) {
      const chunk = await reader.read();
      const { done, value } = chunk;
      if (done) {
        break;
      } else {
        const decodedChunk = decoder.decode(value);
        const lines = decodedChunk.split("\n");
        const parsedLines = lines
          .map((line) => line.replace(/^data: /, "").trim())
          .filter((line) => line!=="" && line!=="[DONE]")
          .map((line)=>JSON.parse(line));

          for(const parsedLine of parsedLines){
            const content = parsedLine.choices[0].delta.content;
            if(content){
              string = string+content;
              state.data = string;
            }
          }
      }
    }
  } catch (e) {
    console.error(e);
  }
  return "error occured";
};
export default Genai;
