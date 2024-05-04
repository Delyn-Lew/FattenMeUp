import { useEffect, useState } from "react";

function ShoppingPage() {
  const [shoppingLists, setShoppingLists] = useState([]);
  const url = "https://api.airtable.com/v0/appiyNczr8JyHLJph/ShoppingPage";

  useEffect(() => {
    async function fetchShoppingList() {
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer patal8G4fWRJI5KHA.9f4bea36a866e19263c7be335fca931f123405814a20db6836c0f3f5e1c9e6e6`,
        },
      });
      if (response.ok) {
        const shoppingLists = await response.json();
        const formattedShoppingLists = shoppingLists.records.map((list) => {
          const formattedIngredients = JSON.parse(list.fields.Ingredients).map(
            (ingredient, index) => ({
              ...ingredient,
              Purchase: false,
              id: index,
            })
          );
          return {
            ...list,
            fields: {
              ...list.fields,
              Ingredients: JSON.stringify(formattedIngredients),
            },
          };
        });
        setShoppingLists(formattedShoppingLists);
      } else {
        console.log("Error fetching shopping lists");
      }
    }
    fetchShoppingList();
  }, []);

  async function handleCheckboxChange(listIndex, ingredientId) {
    const updatedShoppingLists = [...shoppingLists];
    const listToUpdate = updatedShoppingLists[listIndex];
    const ingredients = JSON.parse(listToUpdate.fields.Ingredients);
    const ingredientIndex = ingredients.findIndex(
      (ingredient) => ingredient.id === ingredientId
    );

    if (ingredientIndex !== -1) {
      ingredients[ingredientIndex] = {
        ...ingredients[ingredientIndex],
        Purchase: !ingredients[ingredientIndex].Purchase,
      };

      const updateUrl = `${url}/${listToUpdate.id}`;
      const updateBody = {
        fields: {
          Ingredients: JSON.stringify(ingredients),
        },
      };

      try {
        const response = await fetch(updateUrl, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer patal8G4fWRJI5KHA.9f4bea36a866e19263c7be335fca931f123405814a20db6836c0f3f5e1c9e6e6`,
          },
          body: JSON.stringify(updateBody),
        });

        if (!response.ok) {
          console.error("Error updating shopping list");
          return;
        }

        const updatedShoppingList = await response.json();

        setShoppingLists(
          updatedShoppingLists.map((list, index) =>
            index === listIndex
              ? {
                  ...list,
                  fields: {
                    ...list.fields,
                    Ingredients: JSON.stringify(ingredients),
                  },
                }
              : list
          )
        );
      } catch (error) {
        console.error("Error updating shopping list!", error);
      }
    }
  }

  return (
    <div>
      {shoppingLists?.map((shoppingList, num) => (
        <div key={shoppingList.id}>
          <p>{shoppingList?.fields?.Name}</p>
          <ul>
            {JSON.parse(shoppingList?.fields?.Ingredients)?.map(
              (ingredient, i) => (
                <li key={`${shoppingList.id}-${ingredient.id}`}>
                  <input
                    type="checkbox"
                    checked={ingredient?.Purchase}
                    onChange={() => handleCheckboxChange(num, ingredient.id)}
                    id={`${shoppingList.id}-${ingredient.id}-${i}`}
                  />
                  <label htmlFor={`${shoppingList.id}-${ingredient.id}-${i}`}>
                    {ingredient?.name}
                  </label>
                </li>
              )
            )}
          </ul>
        </div>
      ))}
    </div>
  );
}

export default ShoppingPage;
