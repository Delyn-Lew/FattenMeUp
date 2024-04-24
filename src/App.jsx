import {Route, Routes} from "react-router-dom"
import HomePage from "./pages/HomePage";


function App(){
  
  return(
      <>
      <Nav />
        <Routes>
          <Route path="/home" element={<HomePage />} />
          <Route path="/home/Recipe" element={<RecipePage />} />
          <Route path="/home/Shopping" element={<ShoppingPage />} />
          <Route path="/home/Bookmark" element={<BookmarkPage />} />
        </Routes>
      </>
  )
}

export default App;