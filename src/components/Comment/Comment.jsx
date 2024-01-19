import { Avatar, Flex, Text, Skeleton, SkeletonCircle } from "@chakra-ui/react"
import useGetProfileById from "../../hooks/useGetProfileById"
import { Link } from 'react-router-dom'
import { timeAgo } from '../../utilities/timeAgo'

const Comment = ({ comment }) => {
  const { isLoading, userProfile, setUserProfile } = useGetProfileById(comment.createdBy);

  if (isLoading) {
    return <CommentSkeleton />
  }

  return (
    <Flex gap={4}>
      <Link to={`/${userProfile.username}`}>
        <Avatar src={userProfile.profilePictureURL} size={"sm"} />
      </Link>
      <Flex direction={"column"}>
        <Flex gap={2} alignItems={"center"}>
          <Link>
            <Text fontWeight={"bold"} fontSize={12}>
              {userProfile.username}
            </Text>
          </Link>
          <Text fontSize={14}>
            {comment.comment}
          </Text>
        </Flex>
        <Text fontSize={14} color={"gray"}>
            {timeAgo(comment.createdAt)}
          </Text>
      </Flex>
    </Flex>
  )
}

export default Comment

const CommentSkeleton = () => {
  return (
    <Flex gap={4} w={"full"} alignItems={"center"}>
      <SkeletonCircle h={10} w={10} />
      <Flex gap={1} flexDir={"column"}>
        <Skeleton h={2} w={100} />
        <Skeleton h={2} w={50} />
      </Flex>
    </Flex>
  )
}