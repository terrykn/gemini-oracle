import { Button, Card } from "@mui/material";
import { useNavigate } from "react-router-dom";

function Info () {
    const navigate = useNavigate();

    const handleHomeClick = () => {
        navigate('/');
    }

    const handleStartClick = () => {
        navigate('/prompt');
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
                <h1>What is PROJECT NAME?</h1>
                <p>Every day, approximately 500 million posts are
                    uploaded to X (formerly Twitter). PROJECT NAME leverages Gemini's linguistic capabilities to harness this vast, readily-available 
                    source of information and analyze emerging internet trends. 
                    Through PROJECT NAME, we can instantly access a unique
                    perspective on public opinion of current events and emerging cultural phenomena, 
                    extending beyond the scope of traditional media.
                </p>

                <h1>How does it work?</h1>
                <p>You can either 1.) Select from a list of recent news, and 
                    Gemini will generate relevant keywords for your search, 
                    or 2.) Enter a custom search query in the search bar.</p>

                <p>The process is simple! The search will extract a comprehensive timeline of X posts through RapidAPI. 
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