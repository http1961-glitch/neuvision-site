import { Routes, Route } from "react-router-dom"
import { HomeCinematic } from "./pages/HomeCinematic"
import { WorkPage } from "./pages/WorkPage"
import { BlogPage } from "./pages/BlogPage"
import { BlogPostPage } from "./pages/BlogPostPage"

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomeCinematic />} />
      <Route path="/work" element={<WorkPage />} />
      <Route path="/blog" element={<BlogPage />} />
      <Route path="/blog/:slug" element={<BlogPostPage />} />
    </Routes>
  )
}

export default App
