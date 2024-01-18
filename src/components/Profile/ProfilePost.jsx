import { Avatar, Button, Flex, GridItem, Image, Modal, ModalOverlay, ModalContent, ModalCloseButton, ModalBody, Text, useDisclosure, Divider, VStack } from "@chakra-ui/react"
import { AiFillHeart } from "react-icons/ai"
import { FaComment } from "react-icons/fa"
import { MdDelete } from "react-icons/md"
import Comment from "../Comment/Comment"
import PostFooter from "../FeedPosts/PostFooter"
import useUserProfileStore from "../../store/userProfileStore"
import useAuthStore from "../../store/authStore"
import usePostStore from "../../store/postStore"
import useShowToast from "../../hooks/useShowToast";
import { useState } from 'react';
import { deleteObject, ref } from "firebase/storage"
import { firestore, storage } from "../../firebase/firebase"
import { arrayRemove, deleteDoc, doc, updateDoc } from "firebase/firestore"

const ProfilePost = ({ post }) => {
  const authUser = useAuthStore(state => state.user);
  const userProfile = useUserProfileStore(state => state.userProfile);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const showToast = useShowToast();
  const [isDeleting, setIsDeleting] = useState(false);
  const deletePost = usePostStore(state => state.deletePost)
  const deletePostCount = useUserProfileStore(state => state.deletePost)

  const handleDeletePost = async () => {
    try {
      if (!window.confirm("Are you sure you want to delete this post?")) {
        return;
      }
      if (isDeleting) {
        return;
      }
      const imageRef = ref(storage, `posts/${post.id}`);
      await deleteObject(imageRef);
      const userRef = doc(firestore, "users", authUser.uid);
      await deleteDoc(doc(firestore, "posts", post.id));
      await updateDoc(userRef, {
        posts: arrayRemove(post.id)
      })
      deletePost(post.id);
      deletePostCount(post.id);
      showToast("Success", "Post deleted successfully.", "success")
      setIsDeleting(false);
    } catch (error) {
      showToast("Error", error.message, "error")
    }
  }

  return (
    <>
      <GridItem
      cursor={"pointer"}
      borderRadius={4}
      overflow={"hidden"}
      border={"1px solid"}
      borderColor={"whiteAlpha.300"}
      position={"relative"}
      aspectRatio={1/1}
      onClick={onOpen}
    >
      <Flex
        opacity={0}
        _hover={{ opacity: 1 }}
        position={"absolute"}
        top={0}
        left={0}
        right={0}
        bottom={0}
        bg={"blackAlpha.700"}
        transition={"all 0.3s ease-in-out"}
        zIndex={1}
        justifyContent={"center"}
      >
        <Flex alignItems={"center"} justifyContent={"center"} gap={50}>
          <Flex>
            <AiFillHeart size={20} />
            <Text fontWeight={"bold"} ml={2}>{post.likes.length}</Text>
          </Flex>
          <Flex>
            <FaComment size={20} />
            <Text fontWeight={"bold"} ml={2}>{post.comments.length}</Text>
          </Flex>
        </Flex>
      </Flex>
      <Image src={post.imageURL} alt="Profile Post" w={"100%"} h={"100%"} objectFit={"cover"} />
      </GridItem>
      <Modal isOpen={isOpen} onClose={onClose} isCentered={true} size={{ base: "3xl", md: "5xl" }}>
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton />
          <ModalBody bg={"black"} pb={5}>
            <Flex gap={4} w={{ base: "90%", sm: "70%", md: "full" }} mx={"auto"} maxH={"90vh"} minH={"50vh"}>
              <Flex
                borderRadius={4}
                overflow={"hidden"}
                border={"1px solid"}
                borderColor={"whiteAlpha.300"}
                flex={1.5}
                justifyContent={"center"}
                alignItems={"center"}
              >
                <Image src={post.imageURL} alt="Profile Post" />
              </Flex>
              <Flex flex={1} flexDirection={"column"} px={10} display={{ base: "none", md: "flex" }}>
                <Flex alignItems={"center"} justifyContent={"space-between"}>
                  <Flex alignItems={"center"} gap={4}>
                    <Avatar src={userProfile.profilePictureURL} size={"sm"} name="Profile Picture" />
                    <Text fontWeight={"bold"} fontSize={12}>
                      {userProfile.username}
                    </Text>
                  </Flex>
                  {authUser?.uid === userProfile.uid && (
                    <Button size={"sm"} bg={"transparent"} _hover={{ bg: "whiteAlpha.300", color: "red.600" }} borderRadius={4} p={1} onClick={handleDeletePost} isLoading={isDeleting}>
                      <MdDelete size={20} cursor={"pointer"} />
                    </Button>
                  )}
                </Flex>
                <Divider my={4} bg={"gray.500"} />
                <VStack w={"full"} alignItems={"start"} maxH={"350px"} overflowY={"auto"}>
                  <Comment
                    createdAt="1d ago"
                    username="asaprogrammer_"
                    profilePic="/profilepic.png"
                    text="wow dummy"
                  />
                  <Comment
                    createdAt="12h ago"
                    username="abrahmov"
                    profilePic="https://bit.ly/dan-abramov"
                    text="nice pic"
                  />
                </VStack>
                <Divider my={4} bg={"gray.800"} />
                <PostFooter isProfilePage={true}/>
              </Flex>
            </Flex>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  )
}

export default ProfilePost