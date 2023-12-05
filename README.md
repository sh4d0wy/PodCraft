# PodCraft

This web application, built using Next.js, is designed to streamline the process of creating podcast scripts and generating interview questions for hosts based on guest names. Along with that now you can generate pretty thumbnails with sentiment analysis of your podcast by uploading it on Audio Analyzer.

## Features

### Podcast Script Generation
 - **Generate Podcast Scripts:** Generate a pro level podcast script in just a few clicks and entering some details

### Interview Question Generation
- **Guest Name Input:** Enter guest names to prompt the system to generate interview questions specifically tailored to each guest.
- **Question Variety:** Generates a wide variety of interview questions based on the topic and specifically for the guest entered using GenAI

### Sentiment Analysis
- **Get Scores:** Upload your podcast audio file into Audio Analyzer and get a score for the emotion your Podcast
- **Realtime Sentiment Analysis:** Provides the type of sentiment your podcast is evoking from three options **Positive,Negative and Neutral**.

### Thumbnail Creation
- **Specific Thumbnails:** Seemlessly generate a thumbnail for your podcast matching the content and title of your audio file 

## Getting Started

### Installation

1. Clone this repository.
2. Install dependencies using `npm install` or `yarn install`.
3. Provide the neccessary environment variables in `.env.local` file inside the root directory.
4. Run the development server using `npm run dev` or `yarn dev`.
5. Open your browser and visit `http://localhost:3000` to access the application.

## Usage  
   ### Script Generation
   - In the left side add the topic of your podcast like **"Recession in India"**
   - Select the tone of the script you want it in either formal,informal and many more...
   - Select whether or not guests are coming.
   - Click on Add Guest and enter the details.
   - After that click on generate script and see the magic🪄 happens .

   ### Audio Analyzer
   - Click the Audio Analyzer button on the top of sidebar.
   - Write the title of your podcast.
   - Upload the audio file you want to analyse.
   - Click on upload button and thumbnail along with a score for the sentiment will be shown .

## Technologies Used

- **Next.js:** A React-based web framework for building the application.
- **React:** Used for building the user interface components.
- **Markdown:** Formatting tool for creating structured podcast scripts.
- **OpenAI Api:** OpenAI API for generating scripts.  
- **JavaScript:** Programming languages used for the functionality of the app.

## Contribution

Contributions are welcome! Feel free to submit issues or pull requests for any improvements or new features you'd like to suggest.

