import React, {useEffect, useState} from "react";

function Start({ imdb }) {

    const [stars, setStars] = useState([])

    useEffect(() => {
        const rating = parseFloat(imdb) / 2;
        const newStars = [];

        for (let i = 0; i < 5; i++) {
            if (i < Math.floor(rating)) {
                newStars.push(<i className="fa fa-star" aria-hidden="true"></i>);
            } else if (i === Math.floor(rating) && rating % 1 !== 0) {
                newStars.push(<i className="fa fa-star-half-o" aria-hidden="true"></i>);
            } else {
                newStars.push(<i className="fa fa-star-o" aria-hidden="true"></i>);
            }
        }

        setStars(newStars);
    }, [imdb]);

    return(
        <div className="slider-ratting d-flex align-items-center ms-lg-3 ms-0" style={{ fontSize: '1.5em' }}>
            <ul className="ratting-start p-0 m-0 list-inline text-warning d-flex align-items-center justify-content-left">
                {stars.map((star, index) => (
                    <li key={index}>{star}</li>
                ))}
            </ul>
            <span className="text-white ms-2">{imdb} IMDB</span>
        </div>
    );
}

export default Start;