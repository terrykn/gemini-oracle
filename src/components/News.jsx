import React, { useState } from 'react';
import Tweets from './Tweets';

function News() {
    const [data, setData] = useState(null);
    const [tweetSearch, setTweetSearch] = useState('');

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

    const handleTweetSearch = (search) => {
      setTweetSearch(search);
    }

    return (
        <div>
            <h1>NEWS API</h1>
            <button onClick={fetchData}>Fetch Data</button>

            <ul>
                {data && (
                    <div>
                        <Tweets input={tweetSearch} />

                        <p>Total Results: {data.totalResults}</p>
                        {data.articles && data.articles.map((item, index) => (
                            <li key={index}>
                                <a href={item.url} target="_blank">{item.title}</a>
                                <button onClick={() => handleTweetSearch(item.title)}>Search tweet</button>
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
