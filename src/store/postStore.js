import { create } from "zustand"

const usePostStore = create((set) => ({
  posts: [],
  createPost: (post) => set(state => ({ posts: [post, ...state.posts] })),
  deletePost: (id) => set(state => ({ posts: state.posts.filter((id) => (post => post.id !== id))})),
  setPosts: (posts) => set({ posts }),
  addComment: (pid, comment) => set(state => ({
    posts: state.posts.map(post => {
      if (post.id === pid) {
        return {
          ...post,
          comments: [...post.comments, comment]
        }
      }
      return post;
    })
  }))
}))

export default usePostStore;