import { useState } from "react"
import useAuthStore from "../store/authStore"
import useShowToast from "./useShowToast"
import { storage } from "../firebase/firebase"
import { getDownloadURL, ref, uploadString } from "firebase/storage"
import { doc, updateDoc } from "firebase/firestore"
import useUserProfileStore from "../store/userProfileStore"
import { firestore } from "../firebase/firebase"

const useEditProfile = () => {
  const [isLoading, setIsLoading] = useState(false);
  const authUser = useAuthStore((state) => state.user);
  const setAuthUser = useAuthStore((state) => state.setUser);
  const setUserProfile = useUserProfileStore((state) => state.setUserProfile)
  const showToast = useShowToast();

  const editProfile = async (input, selectedFile) => {
    if (isLoading) {
      return;
    }
    if (isLoading || !authUser) {
      return
    }
    setIsLoading(true);

    const storageRef = ref(storage, `profile/${authUser.uid}`)
    const userDocumentRef = doc(firestore, "users", authUser.uid)

    let url = "";
    try {
      if (selectedFile) {
        await uploadString(storageRef, selectedFile, "data_url");
        url = await getDownloadURL(storageRef)
      }

      const updatedUser = {
        ...authUser,
        fullName: input.fullName || authUser.fullName,
        username: input.username || authUser.username,
        bio: input.bio || authUser.bio,
        profilePictureURL: url || authUser.profilePictureURL
      }

      await updateDoc(userDocumentRef, updatedUser);
      localStorage.setItem("user-info", JSON.stringify(updatedUser));
      setAuthUser(updatedUser);
      setUserProfile(updatedUser);
      showToast("Success", "Profile updated successfully.", "success");
    } catch (error) {
      showToast("Error", error.message, "error");
    }
  }
  return { editProfile, isLoading }
}

export default useEditProfile