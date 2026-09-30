import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CountryProvider } from "./hooks/useCountry";
import MainLayout from "./layouts/MainLayout";
import Home from "./pages/Home";
import Marketplace from "./pages/Marketplace";
import ProductDetail from "./pages/ProductDetail";
import Printables from "./pages/Printables";
import Pricing from "./pages/Pricing";
import CustomOrder from "./pages/CustomOrder";
import Track from "./pages/Track";
import Account from "./pages/Account";
import About from "./pages/About";

export default function App() {
  return (
    <CountryProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<MainLayout />}>
            <Route index element={<Home />} />
            <Route path="marketplace" element={<Marketplace />} />
            <Route path="product/:id" element={<ProductDetail />} />
            <Route path="printables" element={<Printables />} />
            <Route path="pricing" element={<Pricing />} />
            <Route path="order" element={<CustomOrder />} />
            <Route path="track" element={<Track />} />
            <Route path="account" element={<Account />} />
            <Route path="about" element={<About />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </CountryProvider>
  );
}
