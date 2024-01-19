import { Box, Container, Flex, Skeleton, SkeletonCircle, Text, VStack } from "@chakra-ui/react"
import FeedPost from "./FeedPost"
import useFetchFeedPosts from "../../hooks/useFetchFeedPosts"
import { LuHeartHandshake } from "react-icons/lu";

const FeedPosts = () => {
  const { isLoading, posts } = useFetchFeedPosts()

  return (
    <Container maxW={"container.sm"} py={10} px={2}>
      {isLoading && [0, 1, 2].map((_, index) => (
        <VStack key={index} gap={4} alignItems={"flex-start"} mb={10}>
          <Flex gap={2}>
            <SkeletonCircle size={10} />
            <VStack gap={2} alignItems={"flex-start"}>
              <Skeleton height={"10px"} w={"200px"} />
              <Skeleton height={"10px"} w={"200px"} />
            </VStack>
          </Flex>
          <Skeleton w={"full"}>
            <Box h={"400px"}>contents wrapped</Box>
          </Skeleton>
        </VStack>
      ))}

      {!isLoading && posts.length > 0 && posts.map((post) => <FeedPost key={post.id} post={post} />)}
      {!isLoading && posts.length === 0 && (
        <>
          <Text fontSize={"xl"} color={"whiteAlpha.800"}>It looks like you are not following anyone.</Text>
          <Text fontSize={"xl"} color={"whiteAlpha.800"}>Go follow someone on the suggested for you list! :D</Text>
          <LuHeartHandshake size={"xl"}/>
        </>
      )}
    </Container>
  )
}

export default FeedPosts