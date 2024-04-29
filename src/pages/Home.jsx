import { Button, Card } from "@mui/material";
import { useNavigate } from "react-router-dom";

function Home () {
    const navigate = useNavigate();

    const handleStartClick = () => {
        navigate('/prompt');
    }

    const handleInfoClick = () => {
        navigate('/info');
    }

    return (
        <div className='home'>
            <Card style={{ padding: '4rem', textAlign: 'center', backgroundColor: '#141525', borderRadius: '.5rem' }}>
                <h1 className="gradient-text">Oracle</h1>
                <div>
                    <Button 
                        style={{ width: '15rem', fontWeight: '900', fontSize: '1rem' }}
                        variant="outlined"
                        onClick={handleStartClick}
                    >
                        START
                    </Button>
                </div>
                <div style={{ height: '1rem' }} />
                <div>
                    <Button 
                        style={{ width: '15rem', fontWeight: '900', fontSize: '1rem' }}
                        variant="outlined"
                        onClick={handleInfoClick}
                    >
                        GUIDE
                    </Button>
                </div>
            </Card>
        </div>
    )
}
export default Home;