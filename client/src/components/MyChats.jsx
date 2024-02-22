import { AddIcon } from "@chakra-ui/icons";
import { Box, Stack, Text } from "@chakra-ui/layout";
import { useToast } from "@chakra-ui/toast";
import axios from "axios";
import { useEffect, useState } from "react";
import { getSender } from "../config/ChatLogics";
import ChatLoading from "./ChatLoading";
import GroupChatModal from "./miscellaneous/GroupChatModal";
import {
  Spacer,
  Flex,
  Button,
  ButtonGroup,
  Heading,
  Spinner,
} from "@chakra-ui/react";
import { ChatState } from "../Context/ChatProvider";

const MyChats = ({ fetchAgain }) => {
  const [loggedUser, setLoggedUser] = useState();

  const { selectedChat, setSelectedChat, user, chats, setChats } = ChatState();

  const toast = useToast();

  const fetchChats = async () => {
    // console.log(user._id);
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      const { data } = await axios.get(
        import.meta.env.VITE_SERVER_DOMAIN + "/api/chat",
        config
      );
      setChats(data);
    } catch (error) {
      toast({
        title: "Error Occured!",
        description: "Failed to Load the chats",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom-left",
      });
    }
  };

  useEffect(() => {
    setLoggedUser(JSON.parse(localStorage.getItem("userInfo")));
    fetchChats();
    // eslint-disable-next-line
  }, [fetchAgain]);

  return (
    <Box
      d={{ base: selectedChat ? "none" : "flex", md: "flex" }}
      flexDir="column"
      alignItems="center"
      p={1}
      bg="white"
      w={{ base: "100%", md: "31%" }}
      borderRadius="lg"
      borderWidth="1px"
      m={4}
      overflow="hidden"
      maxWidth="100%"
      h="90%"
    >
      <Box
        m={2}
        pb={1}
        px={1}
        py={1}
        maxWidth="600px"
        margin="auto"
        borderRadius="lg"
        bg="#E4DEDE"
        h={{ base: "18%", md: "10%", sm: "20%" }}
      >
        <Flex
          minWidth={{ base: "90%", md: "max-content" }}
          direction={{ base: "column", md: "row" }}
          alignItems={{ base: "initial", md: "center" }}
          gap={{ base: "1", md: "1" }}
        >
          <Box p="2">
            <Heading size="md">My Chats</Heading>
          </Box>
          <Spacer />
          <ButtonGroup gap="1">
            <GroupChatModal>
              <Button
                d="flex"
                fontSize={{ base: "15px", md: "10px", lg: "17px" }}
                rightIcon={<AddIcon />}
              >
                New Group Chat
              </Button>
            </GroupChatModal>
          </ButtonGroup>
        </Flex>
      </Box>

      {chats.length === 0 && <ChatLoading />}

      <Box
        d="flex"
        flexDir="column"
        p={3}
        bg="#F7F2F2"
        w="auto"
        h={{ base: "81%", md: "90.5%", sm: "76%" }}
        borderRadius="lg"
        overflowY="auto"
        mt={2}
      >
        {chats ? (
          <Stack overflowY="auto" h="">
            {chats.map((chat) => (
              <Box
                onClick={() => setSelectedChat(chat)}
                cursor="pointer"
                bg={selectedChat === chat ? "#38B2AC" : "#E8E8E8"}
                color={selectedChat === chat ? "white" : "black"}
                px={3}
                py={2}
                borderRadius="lg"
                key={chat._id}
                _hover={{ bg: "darkgrey", color: "white" }}
              >
                <Text>
                  {!chat.isGroupChat
                    ? getSender(loggedUser, chat.users)
                    : chat.chatName}
                </Text>
                {chat.latestMessage && (
                  <Text fontSize="xs">
                    <b>{chat.latestMessage.sender.name} : </b>
                    {chat.latestMessage.content.length > 50
                      ? chat.latestMessage.content.substring(0, 51) + "..."
                      : chat.latestMessage.content}
                  </Text>
                )}
              </Box>
            ))}
          </Stack>
        ) : (
          <></>
        )}
      </Box>
    </Box>
  );
};

export default MyChats;
