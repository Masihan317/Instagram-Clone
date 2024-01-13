import { Button, Input } from "@chakra-ui/react"
import { useState } from 'react';

const Login = () => {
  const [input, setInput] = useState({
    email: "",
    password: "",
  })

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
      <Button w={"full"} colorScheme="blue" size={"sm"} fontSize={14}>
        Log in
      </Button>
    </>
  )
}

export default Login