import { useState, useEffect } from 'react';
import runGemini from './Gemini';
import Markdown from 'react-markdown';
import { Button, Grid, Card, CardContent, CardHeader, CardMedia, Avatar, Typography, CircularProgress } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import FavoriteIcon from '@mui/icons-material/Favorite';
import VisibilityIcon from '@mui/icons-material/Visibility';
import CommentIcon from '@mui/icons-material/Comment';

function Tweets({ input }) {
    const [data, setData] = useState(null);
    const [response, setResponse] = useState('Click \"GENERATE ANALYSIS\" to process and analyze your search.');
    const [loading, setLoading] = useState(false);
    const [loadingTweets, setLoadingTweets] = useState(false);

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
      // prevent tweets from re-rendering
      // after they've already been rendered for this search

      if(data && data.length > 1){
        return;
      }
      else if(input.length > 1){
        fetchData();
      }
    }, [input]);
  
    const fetchData = async () => {
      setLoadingTweets(true);
      try {
        const response = await fetch(url, options);
        const result = await response.text();
        console.log(result);
        setData(result);
      } 
      catch (error) {
        console.error(error);
      }
      finally{
        setLoadingTweets(false);
      }
    }

    const handleGeminiPrompt = async (tweetData) => {
      setLoading(true);
      try{
        if(tweetData && tweetData.length > 1){
          const prompt = 
  
          `Read this timeline from Twitter: ${tweetData}.
  
          Feel free to be expressive, creative, and analyze the tweets VERY specifically
          as if you are a professional at reading sentiment from tweets. What key terms were used
          and what does that say about user opinions? Exactly how many times were certain things mentioned? Etc.
          Based on the timeline, tell me a very detailed analysis 2-3 paragraphs per section.
          including exactly only these key categories: background, relevant locations and dates,
          summarization of event and trending discussions,
          sentiment analysis comparing views and emotions on the topic,
          impact assessment.
  
          Be very detailed and descriptive in your response, utilizing the data provided. 
          Mention 2-3 quotes from the data. They have to reference exactly the tweets 
          from the data provided and credit the corresponding usernames exactly from the data.
          `;
          const geminiResponse = await runGemini(prompt);
          setResponse(geminiResponse);
        }
        else{
          setResponse('Uh oh! It seems like a search hasn\'t been made. Please make a search! (or keep clicking, it may take a extra few seconds)');
        }
      }
      catch(error){
        console.error(error);
        setResponse("An error occurred while processing the prompt!");
      }
      finally{
        setLoading(false);
      }
    }

    const parsedData = JSON.parse(data);
    const totalTweets = parsedData && parsedData.timeline ? parsedData.timeline.length : 0;

    const navigate = useNavigate();

    const handleStartClick = () => {
        navigate('/prompt');
    }
  
    return (
      <div>

      <h3>ANALYSIS:</h3>
      <Card style={{ padding: '1rem', paddingBottom: '1rem', backgroundColor: '#141525', borderRadius: '.5rem', color: '#ced1f1' }}>
        {loading ? (
          <CircularProgress /> 
        ) : (
          <Markdown>
            {response}
          </Markdown>
        )}
      </Card>

      <div style={{ height: '1rem' }} />

      <Button 
        style={{ fontWeight: '900', fontSize: '1rem' }}
        variant="outlined" 
        color="primary" 
        onClick={() => handleGeminiPrompt(data)}
      >
        GENERATE ANALYSIS
      </Button>

      <Button 
        style={{ fontWeight: '900', fontSize: '1rem', marginLeft: '1rem' }}
        variant="outlined" 
        color="primary" 
        onClick={handleStartClick}
      >
        START A NEW SEARCH
      </Button>

      <h3>TWEETS FOUND: ({totalTweets})</h3>
      
        <Card style={{ padding: '2rem', backgroundColor: '#141525', borderRadius: '.5rem', color: '#ced1f1' }}>
          {loadingTweets ? (
          <CircularProgress /> 
          ) : (
          <Grid container spacing={2}>
            {parsedData && parsedData.timeline && parsedData.timeline.map((item, index) => (
              <Grid item xs={12} sm={6} md={4}>
                <Card key={index}>
                  <CardContent>
                      <CardHeader
                          avatar={
                              item.user_info && (
                                  <Avatar src={item.user_info.avatar} alt={item.user_info.name} />
                              )
                          }
                          title={<Typography variant="h6">{item.user_info ? item.user_info.screen_name : 'Unknown User'}</Typography>}
                          subheader={<Typography variant="subtitle2">{item.created_at}</Typography>}
                      />

                      {item.entities && item.entities.media && item.entities.media.map((mediaItem, mediaIndex) => (
                          <CardMedia
                              key={mediaIndex}
                              component="img"
                              image={mediaItem.media_url_https}
                              alt={`Media ${mediaIndex + 1}`}
                              style={{ width: '100%', maxWidth: '20rem', maxHeight: '20rem' }}
                          />
                      ))}

                  <br />

                      <Typography variant="body2" style={{ marginBottom: '1rem' }}>
                          {item.text}
                      </Typography>

                      <Typography>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                          <VisibilityIcon style={{ marginRight: '.2rem' }} /> {item.views} 
                          <FavoriteIcon style={{ marginLeft: '.5rem', marginRight: '.2rem' }} /> {item.favorites} 
                          <CommentIcon style={{ marginLeft: '.5rem', marginRight: '.2rem' }} /> {item.replies} 
                        </div>
                      </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>

          )}
        </Card>
      
          
      </div>
    );
}
export default Tweets;