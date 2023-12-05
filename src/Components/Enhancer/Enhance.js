"use client";
import axios from "axios";
import { useEffect } from "react";
import fetch from "node-fetch";


const Enhance = async ({ file }) => {
  let file_uploaded = false;
  let jobId = null;
  let access_token = "";
  let status = null;
  const auth = Buffer.from(
    `${process.env.NEXT_PUBLIC_ENHANCE_KEY}:${process.env.NEXT_PUBLIC_ENHANCE_SECRET}`
  ).toString("base64");
  const response = await fetch("https://api.dolby.io/v1/auth/token", {
    method: "POST",
    body: new URLSearchParams({
      grant_type: "client_credentials",
      expires_in: 1800,
    }),
    headers: {
      Accept: "application/json",
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: `Basic ${auth}`,
    },
  });
  const json = await response.json();
  access_token = json.access_token;

  if (access_token !== "") {
    const config = {
      method: "post",
      url: "https://api.dolby.com/media/input",
      headers: {
        Authorization: `Bearer ${access_token}`,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      data: {
        url: "dlb://in/audio.mp3",
      },
    };

    await axios(config)
      .then(async function (response) {
        // Upload your media to the pre-signed url response
        console.log(`Upload ${file} to ${response.data.url}`);

        const upload_config = {
          method: "put",
          url: response.data.url,
          data: file,
          maxContentLength: Infinity,
          maxBodyLength: Infinity,
          headers: {
            "Content-Type": "application/octet-stream",
          },
        };

       await axios(upload_config)
          .then(async function () {
            file_uploaded = true;
            console.log("File uploaded");
            if (file_uploaded) {
              console.log("something");
              const config = {
                method: "post",
                url: "https://api.dolby.com/media/enhance",
                headers: {
                  Authorization: `Bearer ${access_token}`,
                  "Content-Type": "application/json",
                  Accept: "application/json",
                },
                data: {
                  input: "dlb://in/example.mp4",
                  output: "dlb://audio/file.mp3",
                },
              };

              const result = axios(config)
                .then( async function (response) {
                  jobId = response.data.job_id;
                  const config = {
                    method: "get",
                    url: "https://api.dolby.com/media/enhance",
                      "headers": {
                         "Authorization": `Bearer ${access_token}`,
                         "Content-Type": "application/json",
                         "Accept": "application/json"
                    },
                    
                    //TODO: You must replace this value with the job ID returned from the previous step.
                    
                    params: {
                      job_id: jobId,
                    },
                  }
                  while(status!=="Success"){
                    setTimeout( ()=>{
                      axios(config)
                        .then(function(response) {
                          status = response.data.status;
                          console.log(response.data)
                          if(status==="Success"){
                            console.log("Done");
                          }
                        })
                        .catch(function(error) {
                          console.log(error)
                        })
                    },3000)
                  }
                  
                  })
                .catch(function (error) {
                  console.log(error);
                });
              console.log("Result ", result);
            }
          })
          .catch(function (error) {
            console.log(error);
          });
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  return jobId;
};

export default Enhance;
