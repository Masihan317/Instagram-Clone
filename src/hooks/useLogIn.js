import useShowToast from "./useShowToast"
import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";
import { auth, firestore } from "../firebase/firebase"
import { doc, getDoc } from "firebase/firestore";
import useAuthStore from "../store/authStore";

const useLogIn = () => {
  const showToast = useShowToast();

  const [
    signInWithEmailAndPassword,
    user,
    loading,
    error,
  ] = useSignInWithEmailAndPassword(auth);

  const loginUser = useAuthStore((state) => state.login)

  const login = async (input) => {
    if (!input.email || !input.password) {
      return showToast("Error", "Please fill in all of the fields.", "error")
    }
    try {
      const userCredential = await signInWithEmailAndPassword(input.email, input.password)
      if (userCredential) {
        const docRef = doc(firestore, "users", userCredential.user.uid);
        const docSnap = await getDoc(docRef);
        localStorage.setItem("user-info", JSON.stringify(docSnap.data()));
        loginUser(docSnap.data());
      }
    } catch (error) {
      showToast("Error", error.message, "error")
    }
  }

  return { loading, error, login }
}

export default useLogIn