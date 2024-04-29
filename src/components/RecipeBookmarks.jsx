import { useEffect, useState } from "react";

function RecipeBookmarks({ recipeId }) {
  const [isBookmarked, setIsBookmarked] = useState(false);
  const url = "https://api.airtable.com/v0/appiyNczr8JyHLJph/Bookmark";
  useEffect(() => {
    checkBookmarkStatus();
  }, [recipeId]);

  async function addToBookmark(recipeId) {
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization:
            "Bearer patal8G4fWRJI5KHA.9f4bea36a866e19263c7be335fca931f123405814a20db6836c0f3f5e1c9e6e6",
        },
        body: JSON.stringify({
          fields: {
            SpoonId: recipeId,
          },
        }),
      });
      if (!response.ok) {
        throw new Error("Network response was not OK");
      }
      setIsBookmarked(true);
    } catch (error) {
      console.error("Error adding bookmark", error);
    }
  }
  async function removeFromBookmark(recipeId) {
    try {
      const response = await fetch(url, {
        method: "DELETE",
        headers: {
          Authorization:
            "Bearer patal8G4fWRJI5KHA.9f4bea36a866e19263c7be335fca931f123405814a20db6836c0f3f5e1c9e6e6",
        },
      });
      if (!response.ok) {
        throw new Error("Network response was not OK");
      }
      setIsBookmarked(false);
    } catch (error) {
      console.error("Error removing bookmark:", error);
    }
  }

  async function checkBookmarkStatus(recipeId) {
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          Authorization:
            "Bearer patal8G4fWRJI5KHA.9f4bea36a866e19263c7be335fca931f123405814a20db6836c0f3f5e1c9e6e6",
        },
        body: JSON.stringify({
          fields: {
            SpoonId: recipeId,
          },
        }),
      });
      if (response.ok) {
        const data = await response.json();
        setIsBookmarked(data.records.length > 0);
      } else {
        setIsBookmarked(false);
      }
    } catch (error) {
      console.log("Error checking bookmark status: ", error);
    }
  }

  async function handleBookmark() {
    if (isBookmarked) {
      await removeFromBookmark();
    } else {
      await addToBookmark();
    }
  }

  return (
    <>
      <div>
        <button onClick={handleBookmark}>
          {isBookmarked ? "Remove Bookmark" : "Bookmark Recipe"}
        </button>
      </div>
    </>
  );
}
export default RecipeBookmarks;
