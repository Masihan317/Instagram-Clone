import { create } from "zustand";

const useUserProfileStore = create((set) => ({
  userProfile: null,
  setUserProfile: (userProfile) => set({ userProfile }),
  incrementPostCount: (post) => set(state => ({
    userProfile: {...state.userProfile, posts: [post.id, ...state.userProfile.posts]}
  })),
  decrementPostCount: (id) => set((state) => ({
    userProfile: {
      ...state.userProfile,
      posts: state.userProfile.posts.filter((pid) => pid !== id)
    }
  }))
}))

export default useUserProfileStore