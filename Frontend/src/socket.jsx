/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react-hooks/rules-of-hooks */
import { createContext, useContext, useEffect, useMemo } from "react";
import io from "socket.io-client";
import { useSelector } from "react-redux";
import { server } from "./components/constants/config";

const SocketContext = createContext();

const getSocket = () => useContext(SocketContext);

const SocketProvider = ({ children }) => {
  const { user } = useSelector((state) => state.auth);

  const socket = useMemo(
    () =>
      io(server, {
        withCredentials: true,
      }),
    []
  );

  useEffect(() => {
    // If user exists (logged in) or changes, reconnect to ensure auth credentials are sent
    if (user) {
      socket.disconnect();
      socket.connect();
    }

    // Cleanup on unmount (optional, but good practice)
    return () => {
      // We might not want to disconnect aggressively to avoid blips, 
      // but if the component unmounts (app close), it's fine.
    };
  }, [user, socket]);

  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
};

export { SocketProvider, getSocket };
