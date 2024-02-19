import {
  Box,
  ButtonGroup,
  Flex,
  Spacer,
  Heading,
  IconButton,
} from "@chakra-ui/react";
import "./styles.css";
import SingleChat from "./SingleChat";
import { ChatState } from "../Context/ChatProvider";
import { getSender, getSenderFull } from "../config/ChatLogics";
import { ArrowBackIcon } from "@chakra-ui/icons";
import ProfileModal from "./miscellaneous/ProfileModal";
import UpdateGroupChatModal from "./miscellaneous/UpdateGroupChatModal";
import { set } from "mongoose";
import { useEffect, useRef, useState } from "react";

const Chatbox = ({ fetchAgain, setFetchAgain }) => {
  const { user, selectedChat, setSelectedChat } = ChatState();
  const containerRef = useRef(null);

  const [fetchMessages, setFetchMessages] = useState(function () {
    return;
  });

  const functionFromParent = (functionFromChild) => {
    setFetchMessages(functionFromChild);
  };

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [selectedChat]);

  return (
    <Box
      d={{ base: selectedChat ? "flex" : "none", md: "flex" }}
      alignItems="center"
      flexDir="column"
      p={1}
      bg="white"
      w={{ base: "100%", md: "65%" }}
      borderRadius="lg"
      borderWidth="1px"
      m={4}
      h="90%"
      overflowY="scroll"
      position="relative"
      //ref={containerRef}
    >
      {selectedChat ? (
        <Box
          pb={2}
          px={1}
          py={1}
          borderRadius="lg"
          bg="#E4DEDE"
          w={{ base: "100%", md: "100%" }}
          h={{ base: "11%", md: "10%" }}
          position="sticky"
          top={0}
          zIndex="99"
        >
          <Flex minWidth="max-content" alignItems="center" gap="2">
            <ButtonGroup gap="2">
              <IconButton
                d={{ base: "flex", md: "none" }}
                icon={<ArrowBackIcon />}
                onClick={() => setSelectedChat("")}
              />
            </ButtonGroup>

            <Spacer />

            <Box p="2">
              <Heading size="md">
                {!selectedChat.isGroupChat
                  ? getSender(user, selectedChat.users)
                  : selectedChat.chatName.toUpperCase()}
              </Heading>
            </Box>

            <Spacer />

            <ButtonGroup gap="2">
              {!selectedChat.isGroupChat ? (
                <ProfileModal user={getSenderFull(user, selectedChat.users)} />
              ) : (
                <UpdateGroupChatModal
                  fetchMessages={fetchMessages}
                  fetchAgain={fetchAgain}
                  setFetchAgain={setFetchAgain}
                />
              )}
            </ButtonGroup>
          </Flex>
        </Box>
      ) : (
        ""
      )}

      <SingleChat
        fetchAgain={fetchAgain}
        setFetchAgain={setFetchAgain}
        functionFromParent={functionFromParent}
      />
    </Box>
  );
};

export default Chatbox;
