import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import TestLand from './TestLand';

const Landing = () => {
  const { id } = useParams();
  const [fanclub, setFanClub] = useState(null);

  useEffect(() => {
    fetch(`/api/fan_clubs/${id}`)
      .then((response) => response.json())
      .then((data) => setFanClub(data))
      .catch((error) => console.error('Error fetching fan club:', error));
  }, [id]);

  return (
    <>
          {fanclub ? (
                      <div className="">
                          <TestLand posts={fanclub.posts} fanclub={fanclub} fanclubId={id} />
                      </div>
                  ) : (
                      <p>Loading...</p>
                  )}
    
    </>
    
  );
};

export default Landing;
