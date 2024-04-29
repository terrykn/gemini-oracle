import { Button, Card } from "@mui/material";
import { useNavigate } from "react-router-dom";

function Info () {
    const navigate = useNavigate();

    const handleStartClick = () => {
        navigate('/prompt');
    }

    const handleHomeClick = () => {
        navigate('/');
    }

    return (
        <div>
            <Button
                style={{ fontWeight: '900', fontSize: '1rem' }}
                variant="outlined" 
                color="primary" 
                onClick={handleHomeClick}
            >
                Back
            </Button>

            <div style={{ height: '1rem' }} />

            <Card style={{ padding: '4rem', paddingTop: '2rem', backgroundColor: '#141525', borderRadius: '.5rem', color: '#ced1f1' }}>
                <h1>What is <span className='gradient-text'>ORACLE</span>?</h1>
                <p>ORACLE leverages Gemini's linguistic capabilities to harness and analyze emerging internet
                    trends from the vast pool of 500 million posts uploaded to X each day. 
                    ORACLE allows us to quickly assess real-time, crowdsourced
                    public opinion and sentiment on current events and emerging cultural phenomena, 
                    extending beyond the scope of traditional media and searching.
                </p>

                <h1>How does it work?</h1>
                <p>You can either 1.) Select from a list of recent news, and 
                    Gemini will generate relevant keywords for your search, 
                    or 2.) Enter a custom search query in the search bar.</p>

                <p>The process is simple and efficient! From the search, RapidAPI extracts a comprehensive timeline of X posts,
                    which Gemini then analyzes according to a specified prompt.  
                    The analysis includes an overview, a detailed assessment, and sentiment analysis 
                    on user opinions surrounding the subject.
                </p>

                <div style={{ height: '1rem' }} />

                <Button 
                    style={{ fontWeight: '900', fontSize: '1rem' }}
                    variant="contained"
                    onClick={handleStartClick}
                >
                    GIVE IT A TRY!
                </Button>
            </Card>

            
        </div>
    )
}
export default Info;