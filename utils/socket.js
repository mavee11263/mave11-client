import io from "socket.io-client";
import { socketUrl } from "./apiUrl";

export const socket = io(socketUrl, {
    transports: ['websocket'],
    forceNew: true,
});