import { useEffect, useState } from "react";
import styled from "styled-components";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/splide/dist/css/splide.min.css";

function Popular() {

    const [popular, setPopular] = useState([]);


    useEffect(() => {
        getPopular();
    }, []);

    const getPopular = async () => {
        //const api = await fetch(`https://api.spoonacular.com/recipes/random?apiKey=${process.env.RECIPES_API_KEY}&number=9`)
        const api = await fetch(`https://api.spoonacular.com/recipes/random?apiKey=5b34d0b033b54641a5d9d5422c0c44e3&number=9`)
        //&number=9 (optional)returns number of recipes
        //restart localhost of "not authorized"
        const data = await api.json();
        setPopular(data.recipes);
    }

    return (
        <div>
            <Wrapper>
                <h3>Popular Picks</h3>
                <Splide >
                    {popular.map((recipe) => {
                        return (
                            <SplideSlide>
                                <Card>
                                    <p>{recipe.title}</p>
                                    <img src={recipe.image} alt={recipe.title} />
                                </Card>
                            </SplideSlide>
                        );
                    })}
                </Splide>
            </Wrapper>
        </div>
    );
}

const Wrapper = styled.div`
    margin: 4rem 0rem;
`;

const Card = styled.div`
    min-height: 25rem;
    border-radius: 2rem;
    overflow: hidden;

    img{
        border-radius: 2rem;
    }
`;

export default Popular
