import { Avatar, Button, Flex, Text } from "@chakra-ui/react"
import useLogOut from "../../hooks/useLogOut"
import useAuthStore from "../../store/authStore"
import { Link } from "react-router-dom"

const SuggestedHeader = () => {
  const { handleLogOut, isLoggingOut, error } = useLogOut();
  const authUser = useAuthStore(state => state.user);

  if (!authUser) {
    return null;
  }
  return (
    <Flex justifyContent={"space-between"} alignItems={"center"} w={"full"}>
      <Flex alignItems={"center"} gap={2}>
        <Link to={`${authUser.username}`}>
          <Avatar alt="User Profile Picture" size={"lg"} src={authUser.profilePictureURL} />
        </Link>
        <Link to={`${authUser.username}`}>
          <Text fontSize={12} fontWeight="bold">
            {authUser.username}
          </Text>
        </Link>
      </Flex>
      <Button
        onClick={handleLogOut}
        size={"xs"}
        background={{ background: "transparent" }}
        fontSize={14}
        fontWeight={"medium"}
        color={"blue.400"}
        cursor={"pointer"}
        isLoading={isLoggingOut}>
        Log out
      </Button>
    </Flex>
  )
}

export default SuggestedHeader