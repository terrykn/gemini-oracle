import { useState, useEffect } from 'react';
import Gemini from './Gemini';

function Tweets({ input }) {
    const [data, setData] = useState(null);
    const [geminiPrompt, setGeminiPrompt] = useState('This is a null prompt. Can you just say this statement: Hello, this is Gemini! There was an issue with the prompt. Please try again.');

    const X_RAPIDAPI_KEY = process.env.REACT_APP_X_RAPIDAPI_KEY;
    const X_RAPIDAPI_HOST = process.env.REACT_APP_X_RAPIDAPI_HOST;
    const url = `https://twitter-api45.p.rapidapi.com/search.php?query=${input}`;
  
    const options = {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': X_RAPIDAPI_KEY,
        'X-RapidAPI-Host': X_RAPIDAPI_HOST
      }
    };
  
    useEffect(() => {
      fetchData();
    }, [input]);
  
    const fetchData = async () => {
      try {
        const response = await fetch(url, options);
        const result = await response.text();
        console.log(result);
        setData(result);
      } 
      catch (error) {
        console.error(error);
      }
    }

    const handleGeminiPrompt = (tweetData) => {
      const prompt = 
      
      `I need you to analyze the following Twitter JSON formatted timeline: ${tweetData}.

      Now, provide me with the following very detailed analysis information on the following key categories: Key Event(s), Relevant Location(s) and Date(s), Summarization of event and trending relevant discussion, Sentiment comparing varying views and emotions on the topic, Impact assessment, and 3 Top Tweets with the most likes.
      Output it in the format like so. Be very detailed and professional in your response, but DO NOT utilize HTML formatting like ** **, only PLAIN text and paragraphs to separate each section:
      Key event: EXAMPLE EVENT
      EXAMPLE CITY, EXAMPLE DATE(s)
     
      What's happening?
      EXAMPLE SUMMARY OF EVENT AND TRENDING RELEVANT DISCUSSIONS
     
      Sentiment analysis:
      EXAMPLE DETAILED SENTIMENT ANALYSIS
      EXAMPLE COMPARE TWO TWEETS AND THEIR EMOTIONS

      Impact assessment:
      EXAMPLE DETAILED IMPACT ASSESSMENT


      Top Tweets:
      EXAMPLE TWEET 1
      NUMBER LIKES, NUMBER RETWEETS


      EXAMPLE TWEET 2
      NUMBER LIKES, NUMBER RETWEETS


      EXAMPLE TWEET 3
      NUMBER LIKES, NUMBER RETWEETS
      `              
      setGeminiPrompt(prompt);
    }
  
    return (
      <div>
        <ul>
          {data}
          <button onClick={() => handleGeminiPrompt(data)}>Send data to gemini</button>
          <Gemini input={geminiPrompt} />
        </ul>
      </div>
    );
}
export default Tweets;