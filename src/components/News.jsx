import React, { useState } from 'react';
import Tweets from './Tweets';
import runGemini from './Gemini';

function News() {
    const [data, setData] = useState(null);
    const [tweetSearch, setTweetSearch] = useState('');
    const [input, setInput] = useState('');

    const NEWS_RAPIDAPI_KEY = process.env.REACT_APP_NEWS_RAPIDAPI_KEY;
    const NEWS_RAPIDAPI_HOST = process.env.REACT_APP_NEWS_RAPIDAPI_HOST;
    const url = 'https://news-api14.p.rapidapi.com/top-headlines?country=us&language=en&pageSize=15&sortBy=timestamp';

    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': NEWS_RAPIDAPI_KEY,
            'X-RapidAPI-Host': NEWS_RAPIDAPI_HOST
        }
    };

    const fetchData = async () => {
        try {
            const response = await fetch(url, options);
            const result = await response.json();
            console.log(result);
            setData(result);
        } catch (error) {
            console.error(error);
        }
    }

    const handleTweetSearch = async (search) => {
        const createSearch = await runGemini (
            `Imagine hypothetically you are doing a search on Twitter. 
            Output ONLY EXACTLY what you would type in for that one single search prompt 
            and NOTHING ELSE, with a goal to find specific information on topics 
            of a news article titled: ${search}. 
            The search should have NO symbols, NO hashtags, only TEXT, 
            and DOES NOT INCLUDE THE NAME OF THE NEWS OUTLET OF THE ARTICLE.`
        )

        setTweetSearch(createSearch);
    }

    const handleInputChange = (e) => {
        setInput(e.target.value);
    }

    const handleCustomSearch = () => {
        setTweetSearch(input);
    }

    return (
        <div>
            <button onClick={fetchData}>DISPLAY THE NEWS ARTICLES</button>

            <h3>MAKE UR OWN SEARCH</h3>
            <input
                type="text"
                value={input}
                onChange={handleInputChange}
            />

            <button onClick={handleCustomSearch}>SEARCH THIS ON TWITTER</button>

            <h3>TWEET SEARCH:</h3>
            {tweetSearch}
            <h3>TWEET SEARCH OUTPUT:</h3>
            <Tweets input={tweetSearch} />

            <h3>NEWS ARTICLES</h3>

            <ul>
                {data && (
                    <div>

                        <h3>TWEET SEARCH:</h3>
                        {tweetSearch}
                        <h3>TWEET SEARCH OUTPUT:</h3>
                        <Tweets input={tweetSearch} />

                        <h3>NEWS ARTICLES:</h3>
                        <p>Total Results: {data.totalResults}</p>
                        {data.articles && data.articles.map((item, index) => (
                            <li key={index}>
                                <a href={item.url} target="_blank">{item.title}</a>
                                <button onClick={() => handleTweetSearch(item.title)}>SEARCH RELATED KEYWORDS TO THIS ARTICLE ON TWITTER</button>
                                <p>Published Date: {item.published_date}</p>
                                <p>Publisher: {item.publisher.name}</p>
                            </li>
                        ))}

                    </div>
                )}
            </ul>
        </div>
    );
}
export default News;
