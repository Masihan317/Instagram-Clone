import { auth, firestore } from "../firebase/firebase"
import { useCreateUserWithEmailAndPassword } from "react-firebase-hooks/auth"
import { collection, query, where, doc, getDocs, setDoc } from "firebase/firestore"
import useShowToast from "./useShowToast";
import useAuthStore from "../store/authStore";

const useCreateUserEmail = () => {
  const [
    createUserWithEmailAndPassword,
    user,
    loading,
    error,
  ] = useCreateUserWithEmailAndPassword(auth);
  const showToast = useShowToast()
  const logInUser = useAuthStore(state => state.login)

  const signup = async (input) => {
    if (!input.email || !input.password || !input.username || !input.fullName) {
      showToast("Error", "Please fill in all of the fields.", "error")
      return
    }

    const usersRef = collection(firestore, "users");
    const getUserInfo = query(usersRef, where("username", "==", input.username));
    const querySnapshot = await getDocs(getUserInfo);

    if (!querySnapshot.empty) {
      showToast("Error", "Username already exists.", "error");
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
        logInUser(userDocument)
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