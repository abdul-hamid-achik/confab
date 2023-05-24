import { env } from '@/env.mjs';
import Pusher from "pusher-js";

// export const pusher = new Pusher({
//   appId: env.PUSHER_APP_ID,
//   key: env.PUSHER_KEY,
//   secret: env.PUSHER_SECRET,
//   cluster: "us3",
//   useTLS: true
// });

export const pusher = new Pusher(env.NEXT_PUBLIC_PUSHER_KEY, {
  cluster: env.NEXT_PUBLIC_PUSHER_CLUSTER,
});

export function createChannel(channelName: string) {
  return pusher.subscribe(channelName);
}
