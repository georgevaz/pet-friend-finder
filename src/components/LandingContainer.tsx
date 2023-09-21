import React from 'react';
// TODO
// responsive design
const LandingContainer = () => {
  return (
    <>
      <div className="landing-container">
        <div className="landing-copy-container">
          <h1 className="hero-h1" style={{ marginBottom: 73 }}>
            Find Your Perfect <br />
            Furry Friend
          </h1>
          <p className="p-large">
            Support shelters and make a difference.
            <br />
            With Pet Friend Finder, you&rsquo;re not just finding
            <br />
            your new best friend - you&rsquo;re also supporting
            <br />
            local shelters and rescue organizations.
          </p>
        </div>
        <div className="hero-image-container">
          <img
            className="hero-image"
            src="https://images.pexels.com/photos/1378849/pexels-photo-1378849.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
          />
        </div>
      </div>
    </>
  );
};

export default LandingContainer;
