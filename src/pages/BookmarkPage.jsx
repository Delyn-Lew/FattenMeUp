function BookmarkPage() {
  const urlBookmark = "https://api.airtable.com/v0/appiyNczr8JyHLJph/Bookmark";
  async function fetchBookmarks() {
    const response = await fetch(url, {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer patal8G4fWRJI5KHA.9f4bea36a866e19263c7be335fca931f123405814a20db6836c0f3f5e1c9e6e6`,
      },
      body: JSON.stringify({
        records: [
          {
            fields: {
              RecipeId: "1",
              SpoonId: "123",
              Ingredients: JSON.stringify([
                { id: 1, name: "fish", purchase: false },
              ]), // Convert Ingredients array to JSON string
            },
          },
        ],
      }),
    });
    const data = await response.json();
    console.log(data);
  }
  return (
    <div>
      <h2>Interested Recipes</h2>
    </div>
  );
}
export default BookmarkPage;
