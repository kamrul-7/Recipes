import React, { useContext } from 'react';
import { toast } from 'react-hot-toast';
import { useLoaderData } from 'react-router-dom';
import { Input } from 'antd';
import { AuthContext } from './AuthProvider';
const { TextArea } = Input;


const Comment = () => {
    // const { Name, rating, img, price, description } = useLoaderData();
    const { user } = useContext(AuthContext)

    const handleComment = event => {
        event.preventDefault();
        const form = event.target;
        const name = form.name.value;
        const email = form.email.value;
        const Comment = form.Comment.value;


        // const comment = {
        //     userName: name,
        //     email,
        //     Comment,
        //     Name,
        //     img,
        //     rating
        // }



        // fetch('https://music-album-pearl.vercel.app/comment', {
        //     method: 'POST',
        //     headers: {
        //         'content-type': 'application/json'
        //     },
        //     body: JSON.stringify(comment)
        // })
        //     .then(res => res.json())
        //     .then(data => {
        //         console.log(data);
        //         if (data.acknowledged) {

        //             toast.success('Comment Successful');

        //         }
        //         else {

        //         }
        //     })
    
    }

    return (
        <div>

            <form onSubmit={handleComment} className='grid grid-cols-1 gap-3 mt-10'>
                <input name="name" type="text"  disabled placeholder="Your Name" className="input w-full bg-white" />
                <input name="email" type="email"  disabled placeholder="Email Address" className="input w-full  bg-white" />
                <TextArea name="Comment" type="text" placeholder="Comment Here" required className="" />
                <br />
                <input className='btn mt-3 w-full bg-red-500 text-white' type="submit" value="Submit" />
            </form>
        </div>
    );
};

export default Comment;