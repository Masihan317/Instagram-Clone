import { Avatar, Box, Button, Flex, Skeleton, SkeletonCircle } from "@chakra-ui/react"
import { Link } from "react-router-dom";
import useFollow from '../../hooks/useFollow'
import { timeAgo } from '../../utilities/timeAgo'

const PostHeader = ({ post, profile }) => {
  const { isLoading, isFollowing, handleFollow } = useFollow(post.createdBy);

  return (
    <Flex justifyContent={"space-between"} alignItems={"center"} w={"full"} my={2}>
      <Flex alignItems={"center"} gap={2}>
        {profile ? (
          <Link to={`/${profile.username}`}>
            <Avatar src={profile.profilePictureURL} alt="User Profile Picture" size={"sm"}></Avatar>
          </Link>
        ) : (
          <SkeletonCircle size={10} />
        )}
        <Flex fontSize={12} fontWeight={"bold"} gap={2}>
          {profile ? (
            <Link to={`/${profile.username}`}>{profile.username}</Link>
          ) : (
            <Skeleton w={"100px"} h={"10px"}/>
          )}
          <Box color={"gray.500"}>• {timeAgo(post.createdAt)}</Box>
        </Flex>
      </Flex>
      <Box cursor={"pointer"}>
        <Button
          size={"xs"}
          background={"transparent"}
          fontSize={12}
          color={"blue.500"}
          fontWeight={"bold"}
          _hover={{
            color: "white"
          }}
          transition={"0.2s ease-in-out"}
          onClick={handleFollow}
          isLoading={isLoading}
        >
          {isFollowing ? "Unfollow" : "Follow"}
        </Button>
      </Box>
    </Flex>
  )
}

export default PostHeader