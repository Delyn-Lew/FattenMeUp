import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function BookmarkPage() {
  const [bookmarkList, setBookmarkList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchBookmarkDetails() {
      const url = "https://api.airtable.com/v0/appiyNczr8JyHLJph/Bookmark";
      const response = await fetch(url, {
        method: "GET", // *GET, POST, PUT, DELETE, etc.
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer patal8G4fWRJI5KHA.9f4bea36a866e19263c7be335fca931f123405814a20db6836c0f3f5e1c9e6e6`,
        },
      });
      if (response.ok) {
        const bookmarkDetails = await response.json();
        setBookmarkList(bookmarkDetails.records);
        setLoading(false);
      } else {
        console.log("Error fetching shopping lists");
      }
    }
    fetchBookmarkDetails();
  }, []);
  console.log(bookmarkList);
  if (loading) {
    return <p>Loading in progress...</p>;
  }
  return (
    <div>
      <h2>Interested Recipes</h2>
      <div>
        {bookmarkList.map((recipe) => (
          <div key={recipe?.fields?.RecordId}>
            <p>{recipe?.fields?.TitleName}</p>
            <Link to={`/recipes/${recipe?.fields?.Spoonid}`}>
              <img src={recipe?.fields?.Image} alt="Recipe" />
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default BookmarkPage;
