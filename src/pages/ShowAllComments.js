import React, { useEffect, useState } from 'react';


const ShowAllComments = () => {
    const [review, setReview] = useState([]);
    useEffect(() => {
        fetch('https://music-album-pearl.vercel.app/comment')
            .then(res => res.json())
            .then(data => setReview(data))
    }, []);
    return (
        <div>
            {
                review.map((comment) => {
                    <div>
                        <p>{comment?.userName}</p>

                    </div>
                })
            }
        </div>
    );
};

export default ShowAllComments;