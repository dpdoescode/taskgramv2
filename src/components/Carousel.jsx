import { useState } from 'react';
import './Carousel.css';
import { useEffect } from 'react';
import TaskCard from './TaskCard';
import arrowLeft from '../components/arrowLeft.png'
import arrowRight from '../components/arrowRight.png'


const visibleCards = 3; // Number of cards visible at once
const cardWidth = 350;
const gap = 20;


const Carousel = ({ events }) => { 
    const [index, setIndex] = useState(0);
    const maxIndex = Math.max(0, events.length - visibleCards);
    const count = events.length;
    const translateX = -(index * (cardWidth + gap));
    const isCentered = count <= visibleCards;

    useEffect (() => {
        if (events.length <= visibleCards && index != 0){
            setIndex(0);
        }

    }, [events.length, index]);

    return (
        <div className="Carousel">
            {count > visibleCards && (
                <button className="arrow arrowLeft" onClick={() => setIndex(i => Math.max(i - 1, 0))}>
                    <img src={arrowLeft} />
                </button>
            )}


            <div className="carouselViewport">
                <div className={`carouselTrack ${isCentered ? "centered" : ""}`} style={{ transform: `translateX(${translateX}px)` }}>
                    {events.map(event => (
                        <div key={event.id} className="taskCardContainer">
                            <TaskCard event={event} />
                        </div>
                    ))}
                </div>
            </div>

            {count > visibleCards && (
                <button className="arrow arrowRight" onClick={() => setIndex(i => Math.min(i + 1, maxIndex))}>
                    <img src={arrowRight} />
                </button>
            )}

        </div>
    );
}

export default Carousel;