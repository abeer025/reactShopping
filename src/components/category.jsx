function Category({ Category, isChosen, onClick }) {
  const { name } = Category;
  return (
    <div
      onClick={onClick}
      className={`${
        isChosen ? "bg-b-400 text-white" : "bg-white text-black"
      } p-2 
        cursor-pointer
        hover:bg-blue-500
        border-purple-400 border px-4 rounded-md`}
    >
      <h1>{name}</h1>
    </div>
  );
}

export default Category;