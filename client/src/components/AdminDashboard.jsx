import React, { useEffect, useState } from 'react'
import { useOutletContext } from 'react-router-dom'

const AdminDashboard = () => {
    const [user] = useOutletContext()
    if (!user || !user.id) {
        return <div>Loading...</div>; // Or any other fallback UI
    }
    const admin_id = user.id

    const [notifications, setNotification] = useState([])

    // need to fecth notifications
    
    const getAdminNotifications = () => {
        fetch(`/api/admin/notifications?admin_id=${admin_id}`, {
            method: 'GET'
        })
        .then((r) => {
            if (!r.ok) {
                throw new Error('Error fetching data')
            }
            return r.json();
        })
        .then((d) => {
            console.log(d);
            setNotification(d)
        })
        .catch((e) => {
            console.error('Catched an error', e)
        })
    }

    useEffect(() => {
        getAdminNotifications(admin_id)
    }, [admin_id])

    const respondToRequest = (notification_id, response) => {
        fetch(`/api/admin/notifications/${notification_id}/respond`, {
            method: 'PUT',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({
                response
            })
        })
        .then((r) => {
            if(!r.ok) {
                throw new Error('Error fetching data')
            }
            console.log("Success");
        })
        .catch((e) => {
            console.error('Catched an error', e)
        })
    }


  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-semibold mb-4">Admin Dashboard</h1>
      <div>
        <h2 className="text-xl font-semibold mb-2">Notifications:</h2>
        <ul className="space-y-4">
          {notifications.map((notification) => (
            <li key={notification.id} className="border p-4 rounded-lg">
              <div>
                <p className="text-lg">Fanclub ID: {notification.fanclub_id}</p>
                <p className="text-lg">Username: {notification.request_username}</p>
              </div>
              <div className="mt-4">
                <button
                  onClick={() => respondToRequest(notification.id, 'accept')}
                  className="bg-green-500 hover:bg-green-600 text-white font-semibold px-4 py-2 rounded-md mr-2"
                >
                  Accept
                </button>
                <button
                  onClick={() => respondToRequest(notification.id, 'deny')}
                  className="bg-red-500 hover:bg-red-600 text-white font-semibold px-4 py-2 rounded-md"
                >
                  Deny
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default AdminDashboard