import { Server } from "socket.io";

export const setupSocketIO = (io: Server) => {
  io.on("connection", (socket) => {
    console.log(`User connected: ${socket.id}`);

    socket.on("disconnect", () => {
      console.log(`User disconnected: ${socket.id}`);
    });

    // Example: Join a board room
    socket.on("joinBoard", (boardId: string) => {
      socket.join(boardId);
      console.log(`User ${socket.id} joined board ${boardId}`);
    });

    // Example: Leave a board room
    socket.on("leaveBoard", (boardId: string) => {
      socket.leave(boardId);
      console.log(`User ${socket.id} left board ${boardId}`);
    });

    // TODO: Implement real-time updates for drag & drop (cards, lists)
    // socket.on('cardMoved', (data) => { /* ... */ });
    // socket.on('listReordered', (data) => { /* ... */ });
  });
};
