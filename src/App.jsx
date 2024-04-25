import {Route, Routes} from "react-router-dom"
import HomePage from "./pages/HomePage";
import RecipePage from "./pages/RecipePage"
import ShoppingPage from "./pages/ShoppingPage";
import BookmarkPage from "./pages/BookmarkPage";
import Nav from "./pages/Nav";

function App(){
  
  return(
      <>
      <Nav />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/recipes/:id" element={<RecipePage />} />
          <Route path="/Shopping" element={<ShoppingPage />} />
          <Route path="/Bookmark" element={<BookmarkPage />} />
        </Routes>
      </>
  )
}

export default App;