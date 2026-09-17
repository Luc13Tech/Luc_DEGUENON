import { Outlet } from "react-router-dom";

import Navbar from "./Navbar";
import Footer from "./Footer";
import BackToTop from "./BackToTop";
import AnimatedCursor from "./AnimatedCursor";
import ScrollToTop from "./ScrollToTop";
import RouteChangeHandler from "./RouteChangeHandler";

export default function AppLayout() {
  return (
    <div className="app-layout">
      <ScrollToTop />
      <RouteChangeHandler />

      <AnimatedCursor />

      <Navbar />

      <main className="app-layout__main">
        <Outlet />
      </main>

      <Footer />

      <BackToTop />
    </div>
  );
}
