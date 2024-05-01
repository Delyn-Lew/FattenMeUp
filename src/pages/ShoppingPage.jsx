import { useEffect, useState } from "react";

function ShoppingPage() {
  const [shoppingLists, setShoppingLists] = useState([]);
  const url = "https://api.airtable.com/v0/appiyNczr8JyHLJph/ShoppingPage";

  // Example POST method implementation:
  useEffect(() => {
    async function fetchShoppingList() {
      const response = await fetch(url, {
        method: "GET", // *GET, POST, PUT, DELETE, etc.
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer patal8G4fWRJI5KHA.9f4bea36a866e19263c7be335fca931f123405814a20db6836c0f3f5e1c9e6e6`,
        },
      });
      if (response.ok) {
        const shoppingLists = await response.json();
        setShoppingLists(shoppingLists.records);
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
    const ingredientToUpdate = Object.values(ingredients).find(
      (ingredient) => ingredient.id === ingredientId
    );

    if (ingredientToUpdate) {
      ingredientToUpdate.purchase = !ingredientToUpdate.purchase;
      const updateUrl = `${url}/${listToUpdate.id}`;
      const updateBody = {
        fields: {
          Ingredients: JSON.stringify(ingredients),
        },
      };

      try {
        const response = await fetch(updateUrl, {
          method: "POST",
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
          shoppingLists.map((list) =>
            list.id === updatedShoppingList.id ? updatedShoppingList : list
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
          <p>{shoppingList?.fields?.SpoonId}</p>
          <ul>
            {JSON.parse(shoppingList?.fields?.Ingredients)?.map(
              (ingredient, i) => (
                <li key={shoppingList?.RecipeId}>
                  <input
                    id={`${shoppingList.id}-${ingredient?.id || i}`}
                    type="checkbox"
                    checked={ingredient?.purchase}
                    onChange={() => handleCheckboxChange(num, ingredient.id)}
                  />
                  <label htmlFor={`${shoppingList.id}-${ingredient?.id || i}`}>
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
