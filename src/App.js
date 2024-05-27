import { useState } from "react";
import Navigation from "./Navigation/Nav";
import Products from "./Products/Products";
import Recommended from "./Recommended/Recommended";
import Sidebar from "./Sidebar/Sidebar";
import "./index.css";

// Veritabanı
import products from "./db/data";
import Card from "./components/Card";

function App() {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [query, setQuery] = useState("");

  // Arama girişi değişikliğini yönetme
  const handleInputChange = (event) => {
    setQuery(event.target.value);
  };

  // Ürünleri filtreleme
  const filteredItems = products.filter((product) =>
    product.title.toLocaleLowerCase().includes(query.toLocaleLowerCase())
  );

  // Radio buton filtreleme
  const handleChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  // Buton filtreleme
  const handleClick = (event) => {
    setSelectedCategory(event.target.value);
  };

  // Filtreleme fonksiyonu
  function filteredData(products, selectedCategory, query) {
    let filteredProducts = products;

    // Arama girişi ile filtreleme
    if (query) {
      filteredProducts = filteredProducts.filter((product) =>
        product.title.toLocaleLowerCase().includes(query.toLocaleLowerCase())
      );
    }

    // Seçilen kategoriye göre filtreleme
    if (selectedCategory) {
      filteredProducts = filteredProducts.filter(
        ({ category, color, company, newPrice, title }) =>
          category === selectedCategory ||
          color === selectedCategory ||
          company === selectedCategory ||
          newPrice === selectedCategory ||
          title === selectedCategory
      );
    }

    return filteredProducts;
  }

  const result = filteredData(products, selectedCategory, query);

  return (
    <>
      <Sidebar handleChange={handleChange} />
      <Navigation query={query} handleInputChange={handleInputChange} />
      <Recommended handleClick={handleClick} />
      <Products result={result}>
        {result.map(({ img, title, star, reviews, newPrice, prevPrice }) => (
          <Card
            key={title}
            img={img}
            title={title}
            star={star}
            reviews={reviews}
            prevPrice={prevPrice}
            newPrice={newPrice}
          />
        ))}
      </Products>
    </>
  );
}

export default App;
