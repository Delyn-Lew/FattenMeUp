import { useEffect, useState } from "react";

function ShoppingPage() {
  const [shoppingLists, setShoppingLists] = useState([]);
  const url = "https://api.airtable.com/v0/appiyNczr8JyHLJph/ShoppingPage";

  // Example POST method implementation:
  https: useEffect(() => {
    async function fetchShoppingList() {
      const response = await fetch(url, {
        method: "GET", // *GET, POST, PUT, DELETE, etc.
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer patal8G4fWRJI5KHA.9f4bea36a866e19263c7be335fca931f123405814a20db6836c0f3f5e1c9e6e6`,
        },
      });
      const shoppingLists = await response.json();
      setShoppingLists(shoppingLists.records);
      //   console.log(shoppingLists);
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
    // updatedShoppingLists[index].fields.Ingredients.find((ingredient) => ingredient.id === ingredientId);

    if (ingredientToUpdate) {
      ingredientToUpdate.purchase = !ingredientToUpdate.purchase;

      const response = await fetch(`${url}/${listToUpdate.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer patal8G4fWRJI5KHA.9f4bea36a866e19263c7be335fca931f123405814a20db6836c0f3f5e1c9e6e6`,
        },
        body: JSON.stringify({
          fields: {
            Ingredients: JSON.stringify(
              [...listToUpdate.fields.Ingredients]
              //   updatedShoppingLists[index].fields.Ingredients
            ),
          },
        }),
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
    }
  }

  return (
    <div>
      {shoppingLists.map((shoppingList, num) => (
        <div key={shoppingList.id}>
          {/* <p>{shoppingList.fields.RecipeId}</p> */}
          <p>{shoppingList.fields.SpoonId}</p>
          <ul>
            {JSON.parse(shoppingList.fields.Ingredients).map(
              (ingredient, i) => (
                <li key={`${shoppingList.id}-${ingredient.id || i}`}>
                  <input
                    type="checkbox"
                    checked={ingredient.purchase}
                    onChange={() => handleCheckboxChange(num, ingredient.id)}
                  />
                  {/* {ingredient.id}  */}
                  <label htmlFor={`{$shoppingList.id}-${ingredient.id || i}`}>
                    {ingredient.name}
                  </label>
                  {/* {ingredient.purchase ? "Purchased" : "Go buy"} */}
                </li>
              )
            )}
          </ul>
        </div>
      ))}
      {/* <button onClick={handleClick}>Click Me!</button> */}
    </div>
  );
}
export default ShoppingPage;

{
  /* // const A =  <ul>
// {JSON.parse(shoppingList.fields.Ingredients[0]).map(
//   (ingredient, i) => (
//     <li key={i}>
//       ({ingredient.id}) {ingredient.name.original}
//       {/* {ingredient.purchase ? "Purchased" : "Go buy"} */
}
//     </li>
//   )
// )}
// </ul> */}
