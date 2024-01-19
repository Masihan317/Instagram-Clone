import { Box, Image } from "@chakra-ui/react"
import PostHeader from "./PostHeader"
import PostFooter from "./PostFooter"
import useGetProfileById from "../../hooks/useGetProfileById"

const FeedPost = ({ post }) => {
  const { isLoading, userProfile, setUserProfile } = useGetProfileById(post.createdBy);

  return (
    <>
      <PostHeader post={post} profile={userProfile} isLoading={isLoading} />
      <Box my={2} borderRadius={4} overflow={"hidden"}>
        <Image src={post.imageURL} alt={"Feed Post Image"}/>
      </Box>
      <PostFooter post={post} profile={userProfile} isLoading={isLoading} />
    </>
  )
}

export default FeedPost