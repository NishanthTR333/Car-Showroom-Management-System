import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function SplashScreen() {
  const navigate = useNavigate();

  useEffect(() => {
    // Play the audio
    const audio = new Audio('/audio/hellcatengine.mp3');
    audio.volume = 0.5; // Set volume to 50%
    audio.play().catch(e => console.error("Audio autoplay was blocked:", e));

    // Redirect after 5 seconds (matching the animation time)
    const timer = setTimeout(() => {
      navigate('/login');
    }, 5000); 

    return () => clearTimeout(timer); // Cleanup timer on unmount
  }, [navigate]);

  return (
    <div className="body">
      {/* We need to re-create the logo animation from styles.css */}
      <div className="imgcontainer zoomlogo" style={{paddingTop: '20vh'}}>
        <div className="rotatelogo">
          <img className="img shakelogo" src="/images/logo.png" alt="NFS Logo" />
        </div>
      </div>
    </div>
  );
}

export default SplashScreen;