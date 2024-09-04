import Products from "./Products";

function Home() {
    return (
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Home Page</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          <Products id={1} name="Product 1" />
          <Products id={2} name="Product 2" />
          <Products id={3} name="Product 3" />
        </div>
      </div>
    );
  }
  
  export default Home;