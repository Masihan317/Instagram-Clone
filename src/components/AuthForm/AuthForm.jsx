import { Button, Box, Image, Input, VStack, Flex, Text } from "@chakra-ui/react"
import { useState } from 'react';
import { useNavigate } from "react-router-dom";

const AuthForm = () => {
  const [isLogin, setIsLogin] = useState(true)
  const [input, setInput] = useState({
    email: "",
    password: "",
    confirmPassword: ""
  })
  const navigate = useNavigate();
  const handleAuth = () => {
    if (!input.email || !input.password) {
      alert("Please fill in all of the fields.")
      return
    }
    navigate("/")
  }

  return (
    <>
      <Box border={"1px solid gray"} boderRadius={4} padding={5}>
        <VStack spacing={4}>
          <Image src="/logo.png" h={24} curser={"pointer"} alt="Instagram" />
          <Input placeholder="Email" fontSize={14} type="email"
            value={input.email}
            onChange={(e) => {
              setInput({...input, email: e.target.value})
            }}
          />
          <Input placeholder="Password" fontSize={14} type="password"
            value={input.password}
            onChange={(e) => {
              setInput({...input, password: e.target.value})
            }}
          />

          {!isLogin ? (
            <Input placeholder="Confirm Password" fontSize={14} type="password"
              value={input.confirmPassword}
              onChange={(e) => {
                setInput({...input, confirmPassword: e.target.value})
              }}
            />
          ): null}

          <Button w={"full"} colorScheme="blue" size={"sm"} fontSize={14} onClick={handleAuth}>
            {isLogin ? "Log in" : "Sign Up"}
          </Button>

          {/* ------- OR ------- */}
          <Flex alignItems={"center"} justifyContent={"center"} my={4} gap={1} w={"full"}>
            <Box flex={2} h={"1px"} bg={"gray.400"} />
            <Text mx={1} color="white">OR</Text>
            <Box flex={2} h={"1px"} bg={"gray.400"} />
          </Flex>

          <Flex alignItems={"center"} justifyContent={"center"} cursor="pointer">
            <Image src="/public/google.png" w={5} alt="Google Logo" />
            <Text mx={2} color="blue.500">Log in with Google</Text>
          </Flex>
        </VStack>
      </Box>
      <Box border={"1px solid gray"} borderRadius={4} padding={5}>
        <Flex alignItems={"center"} justifyContent={"center"}>
          <Box mx={2} fontSize={14}>
            {isLogin ? "Don't have an account?" : "Already have an account?"}
          </Box>
          <Box onClick={() => setIsLogin(!isLogin)} color={"blue.500"} cursor="pointer">
            {isLogin ? "Sign up" : "Log in"}
          </Box>
        </Flex>
      </Box>
    </>
  )
}

export default AuthForm