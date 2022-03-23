import { useEffect, useState } from "react";
import styled from 'styled-components';
import { useParams } from "react-router-dom";
import React from 'react'

function Recipe() {

    let params = useParams();
    const [details, setDetails] = useState({});
    const [activeTab, setActiveTab] = useState("instructions");

    const fetchDetails = async () => {
        const data = await fetch(`https://api.spoonacular.com/recipes/${params.name}/information?apiKey=${process.env.REACT_APP_RECIPES_API_KEY}`);
        const detailData = await data.json();
        setDetails(detailData);
    }

    useEffect(() => {
        fetchDetails();
    }, [params.name])

    return (
        <DetailWrapper>
            <div>
                <h2>{details.title} </h2>
                <img src={details.image} alt={details.title} />
            </div>
            <Info>
                <Button className={activeTab === 'summary' ? 'active' : ''}
                    onClick={() => setActiveTab("summary")}>Summary
                </Button>
                <Button className={activeTab === 'instructions' ? 'active' : ''}
                    onClick={() => setActiveTab("instructions")}>Instructions
                </Button>
                <Button className={activeTab === 'ingredients' ? 'active' : ''}
                    onClick={() => setActiveTab("ingredients")}>Ingredients
                </Button>
                {activeTab === "summary" && (
                    <div>
                        <h3 dangerouslySetInnerHTML={{ __html: details.summary }}></h3>
                    </div>
                )};
                {activeTab === "instructions" && (
                    <div>
                        <p dangerouslySetInnerHTML={{ __html: details.instructions }}></p>
                    </div>
                )}
                {activeTab === "ingredients" && (
                    <ul>
                        {details.extendedIngredients.map((ingredient) => (
                            <li key={ingredient.id}>{ingredient.original}</li>
                        ))}
                    </ul>
                )};
            </Info>
        </DetailWrapper>
    )
}

const DetailWrapper = styled.div`
    margin-top: 6rem;
    margin-bottom: 5rem;
    display: flex;
    .active {
        background: linear-gradient(35deg, #494949, #313131);
        color: white;
    }
    h2{
        font-size: 1.5rem;
        margin-bottom: 1rem;
    }
    h3{
        font-size: 1.2rem;
        margin-bottom: 1.5rem;
    }
    li {
        font-size: 1.2rem;
        line-height: 2.5rem;
    }
    ul {
        margin-top: 2rem;
    }
`;
const Button = styled.button`
    padding: 1rem 1rem;
    color: #313131;
    background: white;
    border: 2px solid black;
    margin-right: 1rem;
    margin-bottom: 1rem;
    font-weight: 600;
`;
const Info = styled.div`
    margin-left: 3rem;
    font-size: 1rem;
`;

export default Recipe;