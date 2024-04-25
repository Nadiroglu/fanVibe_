import React from 'react'



const FanClubList = ({clubs}) => {
  
  return (
    <div className="club-list">
      {clubs.map((club) => (
        <div key={club.id} className="club-list-item">
          <img src={club.logo_url} alt={club.name} className="club-logo" />
          <h3 className="club-name">{club.name}</h3>
          <p className="club-description">{club.description}</p>
          {/* Additional club details (e.g., location, website link) can be included here */}
        </div>
      ))}
    </div>
  );
}

export default FanClubList