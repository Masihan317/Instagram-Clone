import { Box, Button, Flex, Input, InputGroup, InputRightElement, Text } from "@chakra-ui/react"
import { useState, useRef } from 'react'
import { CommentLogo, NotificationsLogo, UnlikeLogo } from "../../assets/Constants"
import usePostComment from "../../hooks/usePostComment"
import useLikePost from "../../hooks/useLikePost"
import useAuthStore from "../../store/authStore"

const PostFooter = ({ post, username, isProfilePage }) => {
  const [comment, setComment] = useState("");
  const { isCommenting, handlePostComment } = usePostComment();
  const { isLiked, likes, handleLikePost } = useLikePost(post);
  const authUser = useAuthStore(state => state.user);
  const commentRef = useRef(null);

  const handleSubmitComment = async () => {
    try {
      await handlePostComment(post.id, comment);
      setComment("");
    } catch {
      showToast("Error", error.message, "error");
    }
  }

  return (
    <Box mb={10} mt={"auto"}>
      <Flex alignItems={"center"} gap={4} w={"full"} pt={0} mb={2} mt={4}>
        <Box cursor={"pointer"} fontSize={18} onClick={handleLikePost}>
          {!isLiked ? (<NotificationsLogo />) : (<UnlikeLogo />)}
        </Box>
        <Box cursor={"pointer"} fontSize={18} onClick={() => commentRef.current.focus()} >
          <CommentLogo />
        </Box>
      </Flex>

      <Text fontWeight={600} fontSize={"sm"}>
        {likes} likes
      </Text>

      {!isProfilePage && (
        <>
          <Text fontWeight={700} fontSize={"sm"}>
            {username}{" "}
          </Text>
          <Text as={"span"} fontWeight={400}>
            Feeling good
          </Text>
          <Text color={"gray"} fontSize={"sm"}>
            View all 1,000 comments
          </Text>
        </>
      )}
      {authUser && (
        <Flex
          alignItems={"center"}
          justifyContent={"space-between"}
          gap={2}
          w={"full"}
        >
          <InputGroup>
            <Input
              variant={"flushed"}
              placeholder={"Add a comment..."}
              fontSize={14}
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              ref={commentRef}
            />
            <InputRightElement>
              <Button
                fontSize={14}
                color={"blue.500"}
                fontWeight={600}
                cursor={"pointer"}
                _hover={{
                  color: "white",
                }}
                bg={"transparent"}
                isLoading={isCommenting}
                onClick={handleSubmitComment}
              >
                Post
              </Button>
            </InputRightElement>
          </InputGroup>
        </Flex>
      )}
    </Box>
  )
}

export default PostFooter