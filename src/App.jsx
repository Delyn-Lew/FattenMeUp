import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import RecipePage from "./pages/RecipePage";
import ShoppingPage from "./pages/ShoppingPage";
import BookmarkPage from "./pages/BookmarkPage";
import NavBar from "./pages/NavBar";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <>
      <div style={{ backgroundImage: `url(./src/BackgroundImg.jpg)` }} />
      <NavBar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/recipes/:id" element={<RecipePage />} />
        <Route path="/Shopping" element={<ShoppingPage />} />
        <Route path="/Bookmark" element={<BookmarkPage />} />
      </Routes>
    </>
  );
}

export default App;
