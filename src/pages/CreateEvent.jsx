import { useState } from 'react';
import DateTimePicker from 'react-datetime-picker'
import './CreateEvent.css'
import 'react-datetime-picker/dist/DateTimePicker.css'
import 'react-calendar/dist/Calendar.css'
import 'react-clock/dist/Clock.css'

const CreateEvent = ({ session }) => {
    const [ start, setStart ] = useState (new Date());
    const [loading, setLoading] = useState(false);
    const [ end, setEnd ] = useState (new Date());
    const [ eventName, setEventName ] = useState('');
    const [ eventDescription, setEventDescription ] = useState('')

    const createCalendarEvent = async () => {
        if (!session?.provider_token){
            alert('Not authenticated with Google');
            return;
        }

        setLoading(true);

        const event = {
            'summary': eventName,
            'description': eventDescription,
            'start': {
                'dateTime': start.toISOString(),
                'timeZone': Intl.DateTimeFormat().resolvedOptions().timeZone
            },
            'end': {
                'dateTime': end.toISOString(),
                'timeZone': Intl.DateTimeFormat().resolvedOptions().timeZone
            }
        }
        try {
        const res = await fetch(
            'https://www.googleapis.com/calendar/v3/calendars/primary/events',
            {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${session.provider_token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(event)
            }
        );

        const data = await res.json();
        console.log(data);
        alert('Event created! Check Google Calendar.');
        } catch (err) {
        console.error(err);
        alert('Failed to create event');
        } finally {
        setLoading(false);
        }
    };

    return (
        <div className="CreateEvent">
            <div className="eventForm">
                <form onSubmit={
                    (e) => {e.preventDefault();
                        createCalendarEvent();
                }}>
                    <label htmlFor="eventName">Event Name</label> <br />
                    <input type="text" id="eventName" name="eventName" value={eventName} onChange={(e) => setEventName(e.target.value)}/><br />
                    <br />

                    <label htmlFor="eventDescription">Event Description</label> <br />
                    <input type="text" id="eventDescription" name="eventDescription" value={eventDescription} onChange={(e) => setEventDescription(e.target.value)}/><br />
                    <br />

                    <label htmlFor="startTime">Start Time</label> <br />
                    <DateTimePicker id="startTime" name="startTime" value={start} onChange={setStart}/><br />
                    <br />
                    
                    <label htmlFor="endTime">End Time</label> <br />
                    <DateTimePicker id="endTime" name="endTime" value={end} onChange={setEnd}/><br />
                    <br />

                    {/* When loading true = in process of creating event, else = waiting to create event*/}
                    <button type="submit" disabled={loading}>
                        {loading ? 'Creating...' : 'Create Event'}
                    </button>
                </form>
            </div>
        </div>

    );

}

export default CreateEvent;