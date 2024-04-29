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
                <p>Every day, approximately 500 million posts are
                    uploaded to X. ORACLE leverages Gemini's linguistic capabilities to harness this vast, readily-available 
                    information and analyze emerging trends. 
                    Through ORACLE, we can quickly evaluate real-time, crowdsourced
                    public opinion and sentiment analysis on current events and emerging cultural phenomena, 
                    extending beyond the scope of traditional media sources.
                </p>

                <h1>How does it work?</h1>
                <p>You can either 1.) Select from a list of recent news, and 
                    Gemini will generate relevant keywords for your search, 
                    or 2.) Enter a custom search query in the search bar.</p>

                <p>The process is quick and simple! The search will extract a comprehensive timeline of X posts through RapidAPI. 
                    Gemini then analyzes this timeline according to a specified prompt, producing a 
                    response that includes an overview, a detailed assessment, and sentiment analysis 
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