import React, { useState } from 'react';
import { Button, Card, Grid, Link, TextField } from '@mui/material';
import { Search } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

function News() {
    const [data, setData] = useState(null);
    const [input, setInput] = useState('');

    const NEWS_RAPIDAPI_KEY = process.env.REACT_APP_NEWS_RAPIDAPI_KEY;
    const NEWS_RAPIDAPI_HOST = process.env.REACT_APP_NEWS_RAPIDAPI_HOST;
    const url = 'https://news-api14.p.rapidapi.com/top-headlines?country=us&language=en&pageSize=6&sortBy=timestamp';

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

    const handleArticleSearch = (title) => {
        const searchQuery = title.replace(/\s/g, '+'); // Replace spaces with + for URL encoding
        navigate(`/response?articleInput=${searchQuery}`);
    };

    const handleCustomSearch = () => {
        const searchQuery = input.replace(/\s/g, '+'); // Replace spaces with + for URL encoding
        navigate(`/response?customInput=${searchQuery}`);
    };

    const handleInputChange = (e) => {
        setInput(e.target.value);
    }

    const navigate = useNavigate();

    const handleHomeClick = () => {
        navigate('/');
    }

    return (
        <div>
            <div style={{ padding: '2rem', paddingBottom: '1rem' }}>
                <Button
                    style={{ fontWeight: '900', fontSize: '1rem' }}
                    variant="outlined" 
                    color="primary" 
                    onClick={handleHomeClick}
                >
                    Back
                </Button>
                
                <Button 
                    className='gradient-text'
                    style={{ fontWeight: '900', fontSize: '1rem', marginLeft: '.5rem' }}
                    variant="outlined" 
                    color="primary" 
                    onClick={fetchData}
                >
                    DISPLAY NEWS ARTICLES
                </Button>

                <div style={{ height: '1rem' }} />

                {data && (
                <Grid container spacing={2}>
                    {data.articles && data.articles.map((item, index) => (

                    // xs (1 per row), sm (2 per row), md (3 per row)
                    <Grid item xs={12} sm={6} md={4} key={index}>
                        <Card style={{ padding: '1.5rem', backgroundColor: '#141525', borderRadius: '.5rem' }}>
                            <div>
                                <Link 
                                    style={{ fontWeight: '600', color: '#AECDE8', textDecoration: 'none' }} 
                                    href={item.url} target="_blank" rel="noopener noreferrer"
                                >
                                    {item.title}
                                    
                                </Link>
                            </div>

                            <p style={{ color: '#9aa2e0' }}>Date: {item.published_date}</p>

                            <Button 
                                variant="outlined" 
                                color="primary" 
                                onClick={() => handleArticleSearch(item.title)}
                            >
                                Analyze
                            </Button>

                            <Button 
                                style={{ marginLeft: '.3rem' }}
                                variant="outlined" 
                                color="primary" 
                                onClick={() => window.open(item.url, '_blank')}
                            >
                                Read
                            </Button>
                        </Card>
                    </Grid>
                    ))}
                </Grid>
                )}
            </div>

            <div style={{ padding: '2rem', paddingTop: '0' }}>
                <p>Have something else specific in mind? Create a custom search below.</p>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <Button 
                        variant="outlined"
                        onClick={handleCustomSearch}
                    >
                        <Search style={{ height: '2.6rem' }} />
                    </Button>
                    <TextField
                        style={{ backgroundColor: '#141525', borderRadius: '.3rem', width: '100vw' }}
                        InputProps={{
                            style: {
                                color: '#9aa2e0',
                            }
                        }}
                        type="text"
                        value={input}
                        onChange={handleInputChange}
                    >
                        
                    </TextField>
                </div>
            </div>
        </div>
    );
}

export default News;