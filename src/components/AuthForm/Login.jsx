import { Alert, AlertIcon, Button, Input } from "@chakra-ui/react"
import { useState } from 'react';
import useLogIn from "../../hooks/useLogIn";

const Login = () => {
  const [input, setInput] = useState({
    email: "",
    password: "",
  })
  const { loading, error, login } = useLogIn();

  return (
    <>
      <Input placeholder="Email" fontSize={14} type="email"
        value={input.email}
        size={"sm"}
        onChange={(e) => {
          setInput({...input, email: e.target.value})
        }}
      />
      <Input placeholder="Password" fontSize={14} type="password"
        value={input.password}
        size={"sm"}
        onChange={(e) => {
          setInput({...input, password: e.target.value})
        }}
      />

      {error && (
        <Alert status={"error"} fontSize={13} p={2} borderRadius={4}>
          <AlertIcon fontSize={12} />
          {error.message}
        </Alert>
      )}

      <Button w={"full"} colorScheme="blue" size={"sm"} fontSize={14}
        isLoading={loading}
        onClick={() => login(input)}>
        Log in
      </Button>
    </>
  )
}

export default Login