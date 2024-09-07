import { Link } from "react-router-dom";

function Card({ item }) {
  const { category, images, id, description, title, price } = item;

  return (
    <Link
      to={`/products/${id}`}
      className="lg:w-1/4 md:w-1/2 p-4 w-full shadow"
    >
    <div className="p-4 md:w-1/3">
      <div className="h-full border-2 border-gray-200 border-opacity-60 rounded-lg overflow-hidden">
        <img
          className="lg:h-48 md:h-36 w-full object-cover object-center"
          src={Array.isArray(images) ? images[0] : images}  // Ensure we use the first image if it's an array
          alt={title}
        />
        <div className="p-6">
          <h2 className="tracking-widest text-xs title-font font-medium text-gray-400 mb-1">
            {typeof category === "string" ? category : category.name}  {/* Adjust for object or string category */}
          </h2>
          <h1 className="title-font text-lg font-medium text-gray-900 mb-3">
            {title}
          </h1>
          <h1 className="title-font text-lg font-medium text-gray-900 mb-3">
            {price}$
          </h1>
          <p className="leading-relaxed mb-3">{description}</p>
          <div
            className="flex items-center text-indigo-500 hover:text-indigo-700 focus:outline-none cursor-pointer"
            // onClick={addToCart}  {/* Implement this when needed */}
          >
            <a className="text-indigo-500 inline-flex items-center md:mb-2 lg:mb-0">
              {/* {isAddToCart ? "added" : "Add to Cart"} */}
            </a>
            Add to cart
            <svg
              className="w-4 h-4 ml-2"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M5 12h14" />
              <path d="M12 5l7 7-7 7" />
            </svg>
          </div>
        </div>
      </div>
    </div>
 </Link>
  );
}

export default Card;
