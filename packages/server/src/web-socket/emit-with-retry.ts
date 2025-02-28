import { Message } from '@ws-chat/common/src';
import { Server } from 'socket.io';

const RETRY_INTERVAL = 5000;
const MAX_RETRIES = 3;

export const emitWithRetry = async (
  io: Server,
  roomId: string,
  event: string,
  data: Message,
  retries = MAX_RETRIES,
) => {
  return new Promise<void>((resolve, reject) => {
    let attempts = 0;

    const sendEvent = () => {
      attempts++;
      io.to(roomId).emit(event, data, (ack: boolean) => {
        if (ack) {
          console.log(`Acknowledgment received for event: ${event}`);
          resolve();
        } else if (attempts < retries) {
          console.log(`No acknowledgment received for event: ${event}, retrying... (${attempts})`);
          setTimeout(sendEvent, RETRY_INTERVAL);
        } else {
          console.log(`Failed to deliver event: ${event} after ${retries} attempts`);
          reject(new Error(`Failed to deliver event: ${event} after ${retries} attempts`));
        }
      });
    };

    sendEvent();
  });
};
