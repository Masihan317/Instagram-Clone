import { auth, firestore } from "../firebase/firebase"
import { useCreateUserWithEmailAndPassword } from "react-firebase-hooks/auth"
import { doc, setDoc } from "firebase/firestore"
import useShowToast from "./useShowToast";

const useCreateUserEmail = () => {
  const [
    createUserWithEmailAndPassword,
    user,
    loading,
    error,
  ] = useCreateUserWithEmailAndPassword(auth);
  const showToast = useShowToast()

  const signup = async (input) => {
    if (!input.email || !input.password || !input.username || !input.fullName) {
      showToast("Error", "Please fill in all of the fields.", "error")
      return
    }
    try {
      const newUser = await createUserWithEmailAndPassword(input.email, input.password)
      if (!newUser && error) {
        showToast("Error", error.message, "error")
        return
      }
      if (newUser) {
        const userDocument = {
          uid: newUser.user.uid,
          email: input.email,
          username: input.username,
          fullName: input.fullName,
          bio: "",
          profilePictureURL: "",
          followers: [],
          following: [],
          posts: [],
          createdAt: Date.now()
        }
        await setDoc(doc(firestore, "users", newUser.user.uid), userDocument)
        localStorage.setItem("user-info", JSON.stringify(userDocument))
      }
    } catch (error) {
      showToast("Error", error.message, "error")
    }
  }

  return {
    loading,
    error,
    signup
  }
}

export default useCreateUserEmail