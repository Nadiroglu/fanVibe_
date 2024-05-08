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
    <div>
        I will fetch my notifications here soon
        <ul>
                {notifications && notifications.map(notification => (
                    <li key={notification.id}>
                         Fanclub ID: {notification.fanclub_id}, Username: {notification.request_username}
                        <br/>
                        <button onClick={() => respondToRequest(notification.id, 'accept')}>Accept</button>
                        <br/>
                        <button onClick={() => respondToRequest(notification.id, 'deny')}>Deny</button>
                    </li>
                ))}
            </ul>
    </div>
  )
}

export default AdminDashboard