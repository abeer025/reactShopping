

function Products ({ id, name }) {
    return (
      <div className="border p-4 rounded-lg shadow-sm">
        <h2 className="text-xl font-semibold">{name}</h2>
        <Link to={`/products/${id}`} className="text-blue-500 hover:underline">View Details</Link>
      </div>
    );
  }
  
  export default Products;