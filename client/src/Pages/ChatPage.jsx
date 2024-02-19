import { Box } from "@chakra-ui/react";
import { useState } from "react";
import Chatbox from "../components/Chatbox";
import MyChats from "../components/MyChats";
import SideDrawer from "../components/miscellaneous/SideDrawer";
import { ChatState } from "../Context/ChatProvider";
import Loader from "../components/utils/Loader";

const Chatpage = () => {
  const [fetchAgain, setFetchAgain] = useState(false);
  const { user } = ChatState();

  return (
    <div style={{ width: "100%" }}>
      {user && <SideDrawer />}
      <Box
        display="flex"
        flexDir="row"
        justifyContent="space-between"
        w="100%"
        h="91.5vh"
      >
        {user ? <MyChats fetchAgain={fetchAgain} /> : <Loader />}
        {user ? (
          <Chatbox fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
        ) : (
          <Loader />
        )}

        {/* Below Code is commented out*/}

        {/*user && <MyChats fetchAgain={fetchAgain} />*/}
        {/*user && (<Chatbox fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} /> )*/}
      </Box>
    </div>
  );
};

export default Chatpage;
