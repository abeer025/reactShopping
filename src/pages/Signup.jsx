

  function Signup() {
    return (
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Signup</h1>
        <form className="flex flex-col space-y-4">
          <input type="text" placeholder="Name" className="p-2 border border-gray-300 rounded" />
          <input type="email" placeholder="Email" className="p-2 border border-gray-300 rounded" />
          <input type="password" placeholder="Password" className="p-2 border border-gray-300 rounded" />
          <button type="submit" className="p-2 bg-blue-500 text-white rounded">Signup</button>
        </form>
      </div>
    );
  }
  
  export default Signup;