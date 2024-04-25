import { createContext, useContext, useState } from "react";

const RecipeContext = createContext();

export const RecipeProvider = ({ children }) => {
    const [selectedRecipe, setSelectedRecipe] = useState([]);
    
    return (
        <RecipeContext.Provider value={{selectedRecipe, setSelectedRecipe}}>
            {children}
        </RecipeContext.Provider>
    );
};

export const useRecipeContext = () => useContext(RecipeContext);