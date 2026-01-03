import './TaskCard.css';

const TaskCard = ({ event }) => {
    {/* dateTime => Day + Start Time + End Time */}
    {/* date => All Day */}
    const start = new Date(event.start.dateTime || event.start.date);
    const end = new Date(event.end.dateTime || event.end.date);
    const sameDay = start.toDateString() === end.toDateString();

    const timeLeft = (start) => {
        const currentTime = new Date()
        const startTime = new Date(start.dateTime || start.date); // Miliseconds > Miliseconds in present time.
        const timeDifference = startTime - currentTime; 

        const minutes = Math.floor(timeDifference / 1000 / 60);
        const hours = Math.floor(minutes / 60); 
        const days = Math.floor(hours / 24);

        if (days > 0){
            return `In ${days} day${days > 1 ? 's' : ''}`;
        }

        if (hours > 0){
            return `In ${hours} hour${hours > 1 ? 's' : ''}`;
        }

        if (minutes > 0){
            return `In ${minutes} minute${minutes > 1 ? 's' : ''}`;
        }

        return 'Happening Now!';
    };

    const startDate = start.toLocaleDateString(undefined, { 
        weekday: 'short',
        month: 'short',
        day: 'numeric',
    });

    const endDate = end.toLocaleDateString(undefined, { 
        day: 'numeric',
    });

    const startTime = event.start.dateTime 
        ? start.toLocaleTimeString([],
            {
                hour : '2-digit',
                minute : '2-digit'
            })
        :
        'All Day';
        

    const endTime = event.end.dateTime 
        ? end.toLocaleTimeString([],
            {
                hour : '2-digit',
                minute : '2-digit'
            })
        :
        '';

    return(
        <div className="taskCard">
            <h4 className="taskTimeLeft">{timeLeft(event.start)}</h4>
            <h3>{event.summary || "Untitled Event"}</h3> {/* Event title */}
            <p className="taskDate">
                {startDate}
                {!sameDay && ` - ${endDate}`}
            </p> {/* Event Date */}
            <p className="taskTime"> {/* Event Start Time - End Time */}
                {startTime} 
                {endTime && ` - ${endTime}`}
            </p>
            {event.description && (<p className="taskDescription">{event.description}</p>)} {/* Event Description */}
        </div>
    );
};     

export default TaskCard;