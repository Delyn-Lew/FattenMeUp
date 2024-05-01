import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import RemoveBookmark from "../components/RemoveBookmark";

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

  async function handleRemove(RecordId) {
    const url = `https://api.airtable.com/v0/appiyNczr8JyHLJph/Bookmark?records[]=${RecordId}`;
    try {
      const response = await fetch(url, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer patal8G4fWRJI5KHA.9f4bea36a866e19263c7be335fca931f123405814a20db6836c0f3f5e1c9e6e6`,
        },
      });
      if (!response.ok) {
        throw new Error("Failed to fetch removed data");
      }
      const removedBM = await response.json();
      console.log("Recipe bookmark removed:", removedBM);
      setBookmarkList(
        bookmarkList.filter((bm) => bm.fields.RecordId !== RecordId)
      );
    } catch (error) {
      console.error("Error fetching removed data:", error);
    }
    console.log(RecordId);
  }

  return (
    <div>
      <h2>Interested Recipes</h2>
      <div>
        {bookmarkList.map((recipe) => (
          <div key={recipe?.fields?.RecordId}>
            <h3>{recipe?.fields?.TitleName}</h3>
            <Link to={`/recipes/${recipe?.fields?.SpoonId}`}>
              <img src={recipe?.fields?.Image} alt="Recipe" />
            </Link>
            <RemoveBookmark
              onRemove={handleRemove}
              RecordId={recipe?.fields?.RecordId}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default BookmarkPage;
