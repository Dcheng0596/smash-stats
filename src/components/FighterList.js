import React, { useState, useEffect } from 'react';
import axios from 'axios';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import Spinner from 'react-bootstrap/Spinner'

// Reduce the number of image imports
function importAll(r) {
    let images = {};
    r.keys().map((item, index) => { images[item.replace('./', '')] = r(item); });
    return images;
  }

// Display all fighters icons 
function FighterList() {
  const [fighters, setFighters] = useState(null);
  
  useEffect (() => {
    axios.get("https://api.kuroganehammer.com/api/characters?game=ultimate")
    .then(res => setFighters(res.data));
  }, [])
  
  const images = importAll(require.context('../assets/fighters', false, /\.(png|jpe?g|svg)$/));

  const displayIcons = fighters!==null ? (
    fighters.map(fighter => {
      return (
        <div key={fighter.OwnerId} className="fighter-icon">
          <OverlayTrigger
            trigger="hover"
            overlay={
            <Tooltip id={fighter.Name}><strong>{fighter.DisplayName}</strong></Tooltip>
            }
          >
            <img src={images[fighter.Name.replace(/\s/g, '') +'.png']} 
                alt={fighter.DisplayName} width="110" height="110"/>
          </OverlayTrigger>
        </div>
      )
    })
  ) : (
    <Spinner animation="border" />
  );


  return (
    <div className="fighters">
      {displayIcons}
    </div>
  )

}


export default FighterList