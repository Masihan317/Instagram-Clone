import { Flex, Image, Text } from "@chakra-ui/react"
import useGoogleAuth from "../../hooks/useGoogleAuth";

const GoogleAuth = ({ prefix }) => {
  const { handleGoogleAuth, loading, error } = useGoogleAuth();

  return (
    <Flex alignItems={"center"} justifyContent={"center"} cursor="pointer" isLoading={loading} onClick={handleGoogleAuth}>
      <Image src="/public/google.png" w={5} alt="Google Logo" />
      <Text mx={2} color="blue.500">{prefix} with Google</Text>
    </Flex>
  )
}

export default GoogleAuth