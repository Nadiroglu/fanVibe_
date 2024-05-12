import React, { useEffect, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

const FanClubList2 = ({ clubs, user }) => {
  const [hoveredClub, setHoveredClub] = useState(null);
  const [modal, setModal] = useState(false);
  const [selectedClub, setSelectedClub] = useState(null);
  const [requestSent, setRequestSent] = useState(false)
  const navigate = useNavigate();

  const handleMembership = () => {

    console.log('Handling membership request...');
    console.log('Selected Club:', selectedClub);
    const membershipRequest = {
      user_id: user.id,
      fanclub_id: selectedClub.id
    }

    console.log(membershipRequest)


    fetch(`/api/send_membership_request`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(membershipRequest)
    })
    .then((res) => {
      if (!res.ok) {
        throw new Error('Error sending membership request')
      }
      console.log('Membership request sent succesfully')
      // setModal(false)
      setRequestSent(true)
    })
    .catch(error => {
      console.error('Catched an error:', error)
    })
  };

  const handleCancel = () => {
    setModal(false);
    console.log('click');
  };



  return (
    <>
        <div className="mt-3 overflow-x-auto whitespace-nowrap transition duration-150 ease-in-out pe-8">
          {clubs.map((club) => {
            const isMember = user && club.club_members.some(member => member.user_id === user.id);
            return (
              <div
                key={club.id}
                className="inline-block mr-5 relative"
                onMouseEnter={() => setHoveredClub(club.id)}
                onMouseLeave={() => setHoveredClub(null)}
              >
                
                <div className="max-w-sm bg-white border border-amber- rounded-lg shadow bg-transparent bg-gradient-to-tr from-[#751565] to-[#5f5606]">
                  {isMember ? (
                    <NavLink to={`/fanclubs/${club.id}`}>
                      <img
                        src={club.logo_url}
                        alt={club.name}
                        className="sm:w-16 md:w-32 lg:w-48 cursor-pointer object-cover transition duration-150 ease-in-out shadow-xl rounded-md delay-300 w-full h-[12vw]"
                      />
                    </NavLink>
                  ) : (
                    <button onClick={() => {setSelectedClub(club); setModal(true)}}>
                      <img
                        src={club.logo_url}
                        alt={club.name}
                        className="sm:w-16 md:w-32 lg:w-48 cursor-pointer object-cover transition duration-150 ease-in-out shadow-xl rounded-md delay-300 w-full h-[12vw]"
                      />
                    </button>
                  )}
                  <div className="p-5">
                    <h3 className="mb-2 text-lg font-bold tracking-tight text-gray-900 dark:text-pink-50">
                      {club.name}
                    </h3>
                    {hoveredClub === club.id && (
                      <div className="max-w-sm bg-white rounded-lg shadow dark:bg-Fuchsia-300 dark:border-white-700">
                        <svg
                          className="w-`0 h-10 mr-1 fill-current text-white"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                        >
                          <path d="M22 5.046c-.81.36-1.68.602-2.598.71a4.67 4.67 0 0 0 2.058-2.57c-.9.534-1.896.92-2.956 1.132a4.68 4.68 0 0 0-7.946 4.267C6.16 7.673 3.267 5.58 1.33 2.822A4.626 4.626 0 0 0 2.1 8.842c-.846-.09-1.67-.27-2.438-.53v.07c0 1.935 1.37 3.55 3.182 3.924a4.714 4.714 0 0 1-2.176.084c.614 1.49 2.39 2.46 4.27 2.49a9.32 9.32 0 0 1-5.494 1.836c-.354 0-.708-.02-1.06-.062a13.192 13.192 0 0 0 7.07 2.066c8.53 0 13.203-7.176 13.203-13.415 0-.203-.006-.405-.015-.607a9.535 9.535 0 0 0 2.34-2.422" />
                        </svg>
                        <p className="mb-8 font-normal text-gray-700 dark:text-gray-400 text-wrap">
                          {club.description}
                        </p>
                        <p className="mb-8 font-normal text-gray-700 dark:text-gray-400 text-wrap">
                          {club.location}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      {user && selectedClub && modal && (
        <div id="modal-container" className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex flex-row items-center justify-center min-h-screen">
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"></div>
            <div className="relative bg-white rounded-lg max-w-md w-full mx-auto p-6">
              <div className="mb-4">
                <img src={selectedClub.logo_url} alt={selectedClub.name} className="mx-auto mb-4 max-w-full h-auto" />
                <h2 className="text-2xl font-bold mb-4">You are not a member of {selectedClub.name}</h2>
                {requestSent ? (
                  <p className="mb-4">Your request has been sent!</p>
                ) : (
                  <>
                  <p className="mb-4">Would you like to become a member?</p>
                  <div className="flex justify-between">
                  <button className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 mr-2" onClick={() => handleMembership(selectedClub)}>Yes</button>
                  <button className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400" onClick={handleCancel}>No</button>
                </div>
                </>
                )}
              </div>
              
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default FanClubList2;
