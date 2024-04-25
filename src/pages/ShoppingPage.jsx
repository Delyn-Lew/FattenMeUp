import { useEffect } from "react";

function ShoppingPage() {
  const url = "https://api.airtable.com/v0/appiyNczr8JyHLJph/Projects";
  // Example POST method implementation:
  useEffect(() => {
    async function fetchShoppingList() {
      // Default options are marked with *
      const response = await fetch(url, {
        method: "GET", // *GET, POST, PUT, DELETE, etc.
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer patal8G4fWRJI5KHA.9f4bea36a866e19263c7be335fca931f123405814a20db6836c0f3f5e1c9e6e6`,
        },
      });
      const shoppingList = await response.json();
      console.log(shoppingList);
    }
    fetchShoppingList();
  }, []);
  return <></>;
}
export default ShoppingPage;
