import { auth, firestore } from "../firebase/firebase"
import { useSignInWithGoogle } from "react-firebase-hooks/auth"
import { doc, getDoc, setDoc } from "firebase/firestore"
import useShowToast from "./useShowToast";
import useAuthStore from "../store/authStore";

const useGoogleAuth = () => {
  const [signInWithGoogle, user, loading, error] = useSignInWithGoogle(auth);
  const showToast = useShowToast()
  const logInUser = useAuthStore(state => state.login)

  const handleGoogleAuth = async () => {
    try {
      const newUser = await signInWithGoogle();
      if (!newUser && error) {
        showToast("Error", error.message, "error")
        return
      }

      const userRef = doc(firestore, "users", newUser.user.uid);
      const userSnap = await getDoc(userRef);
      let userDocument = userSnap.data();

      if (!userSnap.exists()) {
        userDocument = {
          uid: newUser.user.uid,
          email: newUser.user.email,
          username: newUser.user.email.split("@")[0],
          fullName: newUser.user.displayName,
          bio: "",
          profilePictureURL: newUser.user.photoURL,
          followers: [],
          following: [],
          posts: [],
          createdAt: Date.now()
        }
        await setDoc(doc(firestore, "users", newUser.user.uid), userDocument)
      }
      localStorage.setItem("user-info", JSON.stringify(userDocument))
      logInUser(userDocument)
    } catch (error) {
      showToast("Error", error.message, "error");
    }
  }
  return { handleGoogleAuth, loading, error }
}

export default useGoogleAuth