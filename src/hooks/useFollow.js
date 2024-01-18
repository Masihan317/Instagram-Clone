import { useState, useEffect } from "react"
import useAuthStore from "../store/authStore";
import useUserProfileStore from "../store/userProfileStore";
import useShowToast from "./useShowToast";
import { arrayRemove, arrayUnion, doc, updateDoc } from "firebase/firestore";
import { firestore } from "../firebase/firebase";

const useFollow = (uid) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isFollowing, setIsFollowing] = useState(false);
  const authUser = useAuthStore(state => state.user);
  const setAuthUser = useAuthStore(state => state.setUser);
  const { userProfile, setUserProfile } = useUserProfileStore();
  const showToast = useShowToast();

  const handleFollow = async () => {

    setIsLoading(true);

    try {
      const currentUserRef = doc(firestore, "users", authUser.uid);
      const otherUserRef = doc(firestore, "users", uid);
      await updateDoc(currentUserRef, {
        following: isFollowing ? arrayRemove(uid) : arrayUnion(uid)
      })
      await updateDoc(otherUserRef, {
        followers: isFollowing ? arrayRemove(authUser.uid) : arrayUnion(authUser.uid)
      })

      if (isFollowing) {
        setAuthUser({
          ...authUser,
          following: authUser.following.filter(id => id !== uid)
        })
        if (userProfile) {
          setUserProfile({
            ...userProfile,
            followers: userProfile.followers.filter(id => id !== authUser.uid)
          })
        }
        localStorage.setItem("user-info", JSON.stringify({
          ...authUser,
          following: authUser.following.filter(id => id !== uid)
        }))

        setIsFollowing(false)
      } else {
        setAuthUser({
          ...authUser,
          following: [...authUser.following, uid]
        })
        if (userProfile) {
          setUserProfile({
            ...userProfile,
            followers: [...userProfile.followers, authUser.uid]
          })
        }
        localStorage.setItem("user-info", JSON.stringify({
          ...authUser,
          following: [...authUser.following, uid]
        }))

        setIsFollowing(true);
      }
    } catch (error) {
      showToast("Error", error.message, "error");
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    if (authUser) {
      const isFollowing = authUser.following.includes(uid);
      setIsFollowing(isFollowing)
    }
  }, [authUser, uid])

  return { isLoading, isFollowing, handleFollow }
}

export default useFollow