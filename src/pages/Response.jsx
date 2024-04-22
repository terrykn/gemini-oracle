import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import CreateSearch from "../components/CreateSearch";
import Tweets from "../components/Tweets";
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

function Response() {
    const location = useLocation();
    const query = new URLSearchParams(location.search);
    const articleInput = query.get('articleInput');
    const customInput = query.get('customInput');

    const [searchQuery, setSearch] = useState('');

    const navigate = useNavigate();

    const handleStartClick = () => {
        navigate('/prompt');
    }

    useEffect(() => {
        async function fetchSearch() {
            let query = '';

            if (articleInput) {
                query = await CreateSearch(articleInput, '');
            } else if (customInput) {
                query = await CreateSearch('', customInput);
            }

            setSearch(query);
        }

        fetchSearch();
    }, [articleInput, customInput]);

    return (
        <div>
            <Button 
                style={{ fontWeight: '900', fontSize: '1rem'}}
                variant="outlined" 
                color="primary" 
                onClick={handleStartClick}
            >
                BACK
            </Button>
            <h1>Let's analyze your search topic!</h1>
            <Tweets input={searchQuery} />
        </div>
    );
}

export default Response;