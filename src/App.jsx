import { Routes, Route, Navigate } from "react-router-dom";

function Home() {
  return (
    <main>
      <h1>Luc DEGUENON</h1>
      <p>Portfolio en cours de construction.</p>
    </main>
  );
}

function NotFound() {
  return (
    <main>
      <h1>404</h1>
      <p>Page introuvable.</p>
    </main>
  );
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
