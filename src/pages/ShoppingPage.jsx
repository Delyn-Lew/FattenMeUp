import { useEffect, useState } from "react";

function ShoppingPage() {
  const [shoppingLists, setShoppingLists] = useState([]);
  const url = "https://api.airtable.com/v0/appiyNczr8JyHLJph/Projects";
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
      const shoppingLists = await response.json();
      setShoppingLists(shoppingLists.records);
      //   console.log(shoppingLists);
    }
    fetchShoppingList();
  }, []);

  async function handleCheckboxChange(index, ingredientId) {
    const updatedShoppingLists = [...shoppingLists];
    const ingredientToUpdate = updatedShoppingLists[
      index
    ].fields.Ingredients.find((ingredient) => ingredient.id === ingredientId);
    ingredientToUpdate.purchase = !ingredientToUpdate.purchase;

    const response = await fetch(`${url}/${updatedShoppingLists[index].id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer patal8G4fWRJI5KHA.9f4bea36a866e19263c7be335fca931f123405814a20db6836c0f3f5e1c9e6e6`,
      },
      body: JSON.stringify({
        fields: {
          Ingredients: JSON.stringify(
            updatedShoppingLists[index].fields.Ingredients
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

  //   async function handleClick() {
  //     const response = await fetch(url, {
  //       method: "POST", // *GET, POST, PUT, DELETE, etc.
  //       headers: {
  //         "Content-Type": "application/json",
  //         Authorization: `Bearer patal8G4fWRJI5KHA.9f4bea36a866e19263c7be335fca931f123405814a20db6836c0f3f5e1c9e6e6`,
  //       },
  //       body: JSON.stringify({
  //         records: [
  //           {
  //             fields: {
  //               RecipeId: "1",
  //               SpoonId: "123",
  //               Ingredients: JSON.stringify([
  //                 { id: 1, name: "fish", purchase: false },
  //               ]), // Convert Ingredients array to JSON string
  //             },
  //           },
  //         ],
  //       }),
  //     });
  //     const data = await response.json();
  //     console.log(data);
  //   }
  return (
    <div>
      {shoppingLists.map((shoppingList, num) => (
        <div key={shoppingList.id}>
          <p>{shoppingList.fields.RecipeId}</p>
          <p>{shoppingList.fields.SpoonId}</p>
          <ul key={num}>
            {JSON.parse(shoppingList.fields.Ingredients).map(
              (ingredient, i) => (
                <li key={ingredient.id}>
                  <input
                    type="checkbox"
                    checked={ingredient.purchase}
                    onChange={() => handleCheckboxChange(index, ingredient.id)}
                  />
                  ({ingredient.id}) {ingredient.name}
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
