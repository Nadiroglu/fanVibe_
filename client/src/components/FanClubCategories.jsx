import React from 'react'
import Category from './Category';

const FanClubCategories = ({filteredClubs}) => {
    console.log(filteredClubs);

    const groupedFanClubs = {}

    // Within the arrow function, the fanclub object is destructured to extract the sport_type property.
    // This line is equivalent to const sport_type = fanclub.sport_type;, where sport_type is assigned the value of fanclub.sport_type.

    filteredClubs.forEach(fanclub => {
      const { sport_type } = fanclub
    //   console.log(`Sport Type: ${sport_type}`);
      if (!groupedFanClubs[sport_type]){
        groupedFanClubs[sport_type] = []
      }
      groupedFanClubs[sport_type].push(fanclub)
    });
  
    return (
      <div className="club-categories">
        {/* Object.entries(groupedClubs) converts the groupedClubs object into an array of key-value pairs, where each pair represents a sport_type and its corresponding array of FanClub objects. */}
        {Object.entries(groupedFanClubs).map(([sportType, clubsInCategory]) => (
            // Here, entries will be an array of arrays where each inner array contains a key-value pair from groupedFanClubs.
          <Category key={sportType} sportType={sportType} clubs={clubsInCategory} />
        //   For each pair, sportType represents the key (e.g., 'soccer', 'basketball') and clubsInCategory represents the value (an array of FanClub objects).
        // The arrow function inside .map() returns an object { sportType, clubs } for each iteration, where sportType is the key (sportType) and clubs is the value (clubsInCategory).
        ))}
      </div>
    )   
}

export default FanClubCategories