import { useState, useEffect } from 'react';
import runGemini from './Gemini';

function Tweets({ input }) {
    const [data, setData] = useState(null);
    const [response, setResponse] = useState('');

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

    const handleGeminiPrompt = async (tweetData) => {
      const prompt = 

      `I need you to analyze this JSON formatted timeline from Twitter: ${tweetData}.

      Based on the timeline, generate a very detailed analysis on these key categories: 
      
      [Key Event(s), Relevant Location(s) and Date(s), 
      Summarization of event and trending relevant discussion, 
      Sentiment comparing varying views and emotions on the topic, 
      Impact assessment, and 3 Top Tweets with the most likes.]

      Be very detailed and professional in your response. Output exactly in the following format. 
      DO NOT utilize HTML formatting like ** **, only PLAIN text and paragraphs to separate each section
      exactly like shown in the following EXAMPLE:

      Key event: EXAMPLE EVENT
      EXAMPLE CITY, EXAMPLE DATE(s)

      *new paragraph*

      What's happening?
      EXAMPLE SUMMARY OF EVENT AND TRENDING RELEVANT DISCUSSIONS
     
      *new paragraph*

      Sentiment analysis:
      EXAMPLE DETAILED SENTIMENT ANALYSIS
      EXAMPLE COMPARE TWO TWEETS AND THEIR EMOTIONS

      *new paragraph*

      Impact assessment:
      EXAMPLE DETAILED IMPACT ASSESSMENT

      *new paragraph*
      
      Top Tweets:
      EXAMPLE TWEET 1
      NUMBER LIKES, NUMBER RETWEETS

      *new paragraph*
      
      EXAMPLE TWEET 2
      NUMBER LIKES, NUMBER RETWEETS

      *new paragraph*
      
      EXAMPLE TWEET 3
      NUMBER LIKES, NUMBER RETWEETS
      ` 

      const geminiResponse = await runGemini(prompt);
      setResponse(geminiResponse);
    }
  
    return (
      <div>
        <ul>
          <h3>DATA:</h3>
          {data}
          <button onClick={() => handleGeminiPrompt(data)}>SEND DATA TO GEMINI TO PROMPT AND GENERATE A RESPONSE</button>

          <h3>RESPONSE:</h3>


          {response}
        </ul>
      </div>
    );
}
export default Tweets;