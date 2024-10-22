import { useState } from "react";
import { auth, db, signInWithEmailAndPassword, ref, set } from "../utils/firebase";
import { useNavigate } from "react-router";
import SignupModal from "../Auth/SignupModal";

function LoginModal({ closeModal }) {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSignupModalOpen, setIsSignupModalOpen] = useState(false); // State for Signup modal

  const openSignupModal = () => {
    setIsSignupModalOpen(true);
  };

  const closeSignupModal = () => {
    setIsSignupModalOpen(false);
  };

  function onSubmit(e) {
    e.preventDefault();

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;

        // Store user data in Realtime Database
        set(ref(db, `users/${user.uid}`), {
          email: user.email,
          uid: user.uid,
        })
          .then(() => {
            navigate("/"); // Navigate after successful login and database save
            closeModal(); // Close the modal after successful login
          })
          .catch((error) => {
            alert("Error saving user data: " + error.message);
          });
      })
      .catch((err) => alert(err.message));
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-600 bg-opacity-50">
      <div className="bg-white w-96 rounded-lg shadow-lg p-6 relative">
        {/* Close Button */}
        <button
          className="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
          onClick={closeModal}
        >
          &times;
        </button>

        <h2 className="text-2xl font-bold mb-5 text-center">Login</h2>

        <form onSubmit={onSubmit}>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="email"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="mb-6">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="password"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Sign In
            </button>
            <a
              href="#"
              className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
            >
              Forgot Password?
            </a>
          </div>

          <div className="flex items-center justify-between">
            <a
              onClick={openSignupModal}
              className="align-baseline mx-auto mt-5 font-bold text-sm text-blue-500 hover:text-blue-800 cursor-pointer"
            >
              Don't Have an Account? Create..
            </a>
          </div>
        </form>
      </div>

      {/* Render Signup Modal if it's open */}
      {isSignupModalOpen && <SignupModal closeModal={closeSignupModal} />}
    </div>
  );
}

export default LoginModal;
