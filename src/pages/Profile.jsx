import React from 'react'
import { useParams } from 'react-router-dom';
import { useEffect, useState, useRef } from 'react';
import Carousel from '../components/Carousel';
import TaskCard from '../components/TaskCard';
import './Profile.css'



const Profile = ({ session }) => {
    console.log(session)
    const { id } = useParams()
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    
    useEffect ( () => {
        if (!session?.provider_token) return; // if no token available -> not logged in 

        const fetchEvents = async () => { {/* grab Google Calendar events */}
            try 
            {
                const now = new Date().toISOString();
                const res = await fetch(
                    `https://www.googleapis.com/calendar/v3/calendars/primary/events?timeMin=${now}&singleEvents=true&orderBy=startTime&maxResults=9`,
                    {
                        headers: {
                            Authorization: `Bearer ${session.provider_token}`,
                        },
                    }
                );

                const data = await res.json();
                setEvents(data.items || []);
            }
            catch(err)
            {
                console.error("Failed to fetch events", err);
            }
            finally
            {
                setLoading(false);
            }
        };
        fetchEvents();

    }, [session]);

    if (loading) {
        return <p>Loading upcoming tasks...</p>;
    
    }

    return (
        <div className="Profile">
            <div className="profileHeader">
                <img src={`${session?.user?.user_metadata?.picture}`} />

                <div className="profileHeaderTxt">
                    <span className="profileName">{`${session?.user?.user_metadata?.name}`}</span>
                    <span className="profileFriends">59 Friends</span>
                </div>
            </div>

            <h3>Upcoming Tasks</h3>

            {events.length === 0 ? (
                <p>No Upcoming Tasks!</p>
            ) : (
                <Carousel events={events} />  // Carousel will render TaskCards horizontally
            )}
        </div>
    );                                                                                                                                                                                                                                                                                                                                                        
};



export default Profile