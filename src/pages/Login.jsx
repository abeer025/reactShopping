import { signInWithEmailAndPassword } from "firebase/auth";
import { ref, set } from "firebase/database"; // Include Realtime Database methods
import { useState } from "react";
import { auth, db } from "../utils/firebase";
import { useNavigate } from "react-router";

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

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
          })
          .catch((error) => {
            alert("Error saving user data: " + error.message);
          });
      })
      .catch((err) => alert(err.message));
  }

  return (
    <div>
      <form
        onSubmit={onSubmit}
        className="flex flex-col items-center justify-center"
      >
        <input
          value={email}
          placeholder="Email"
          required
          className="p-2 border my-3 w-1/2"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          value={password}
          placeholder="Password"
          type="password"
          required
          className="p-2 border my-3 w-1/2"
          onChange={(e) => setPassword(e.target.value)}
        />
        <input
          type="submit"
          value="Login"
          className="w-1/2 bg-indigo-500 text-white py-3 px-4 rounded hover:bg-indigo-600 cursor-pointer"
        />
      </form>
    </div>
  );
}

export default Login;
