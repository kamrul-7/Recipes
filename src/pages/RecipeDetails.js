import React, { useContext, useEffect, useState } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { AuthContext } from '../pages/AuthProvider';
import Comments from './Comments';

const RecipeDetails = () => {
    const { id } = useParams();
    const { user } = useContext(AuthContext);
    const [recipeDetails, setRecipeDetails] = useState(null);

    useEffect(() => {
        const fetchRecipeDetails = async () => {
            try {
                const response = await fetch(`https://api.spoonacular.com/recipes/${id}/information?apiKey=1513da97d0234b2d8dfc2093707ad823`);
                if (!response.ok) {
                    throw new Error('Error fetching recipe details');
                }

                const data = await response.json();
                setRecipeDetails(data);
            } catch (error) {
                console.error('Error fetching recipe details:', error);
            }
        };

        fetchRecipeDetails();
    }, [id]);

    useEffect(() => {
        // Check if the user is authenticated when the component mounts
        if (!user) {
            // Redirect to login page if not authenticated
            window.location.href = "/login"; // Use window.location.href for redirection
        }
    }, [user]);

    if (!recipeDetails) {
        return <div>Loading...</div>; // You can add a loading spinner or message
    }

    return (
        <div>
            <div>
                <h1 className='recipe-details-title'>{recipeDetails.title}</h1>
                <img src={recipeDetails.image} alt={recipeDetails.title} />
                <p dangerouslySetInnerHTML={{ __html: recipeDetails.summary }} />
                {/* You can render more details as needed */}
            </div>

            <div>
                <div className='mt-12'>
                    <h3 className='text-center text-red-500 text-2xl '>Review</h3>
                </div>
                <div className='flex justify-center mt-12'>
                    <Comments></Comments>
                </div>
            </div>
        </div>
    );
};

export default RecipeDetails;
