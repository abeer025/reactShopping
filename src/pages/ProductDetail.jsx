

import React from 'react';
import { useParams } from 'react-router-dom';

function ProductDetail() {
  const { id } = useParams();

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold">Product Detail for Product {id}</h1>
      <p>Details of the product will be displayed here.</p>
    </div>
  );
}

export default ProductDetail;
