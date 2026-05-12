import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Home } from '@/routes/home'
import { CaseDetail } from '@/routes/case-detail'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cases/:slug" element={<CaseDetail />} />
      </Routes>
    </BrowserRouter>
  )
}
