import { useState } from "react";
import {
  createUserWithEmailAndPassword,
  // GoogleAuthProvider,
  // signInWithPopup,
  ref, set, auth, db
} from "../utils/firebase";
import { useNavigate } from "react-router";

function SignupModal({ closeModal }) {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();

    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;

        // Store user data in Realtime Database
        set(ref(db, `users/${user.uid}`), {
          email: user.email,
          uid: user.uid,
        })
          .then(() => {
            navigate("/"); // Navigate after successful signup and database save
            closeModal(); // Close the modal after successful registration
          })
          .catch((error) => {
            alert("Error saving user data: " + error.message);
          });
      })
      .catch((error) => alert("Error signing up: " + error.message));
  };

  // const handleSignInWithGoogle = () => {
  //   const provider = new GoogleAuthProvider();
  //   signInWithPopup(auth, provider)
  //     .then((result) => {
  //       const user = result.user;

  //       // Store user data in Realtime Database
  //       set(ref(db, `users/${user.uid}`), {
  //         email: user.email,
  //         uid: user.uid,
  //       })
  //         .then(() => {
  //           navigate("/"); // Navigate after successful signup and database save
  //           closeModal(); // Close the modal after successful registration
  //         })
  //         .catch((error) => {
  //           alert("Error saving user data: " + error.message);
  //         });
  //     })
  //     .catch((error) => {
  //       const errorCode = error.code;
  //       const errorMessage = error.message;

  //       if (errorCode === "auth/popup-closed-by-user") {
  //         alert("You closed the Google sign-in popup too early.");
  //       } else if (errorCode === "auth/account-exists-with-different-credential") {
  //         alert("An account with this email already exists using a different sign-in method.");
  //       } else {
  //         alert("Error signing in with Google: " + errorMessage);
  //       }
  //     });
  // };

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

        <h2 className="text-2xl font-bold mb-5 text-center">Signup</h2>

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
              Sign Up
            </button>
            {/* <button
              type="button"
              onClick={handleSignInWithGoogle}
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Sign Up with Google
            </button> */}
          </div>
        </form>
      </div>
    </div>
  );
}

export default SignupModal;
