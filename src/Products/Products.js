import React from "react";
import Card from "../components/Card";
import "./Products.css";

function Products({ result }) {
  return (
    <>
      <section className="card-container">
        {result.map(({ img, title, star, reviews, newPrice, prevPrice }) => (
          <Card
            key={Math.random()}
            img={img}
            title={title}
            star={star}
            reviews={reviews}
            prevPrice={prevPrice}
            newPrice={newPrice}
          />
        ))}
      </section>
    </>
  );
}

export default Products;
