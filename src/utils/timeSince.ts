import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en";

TimeAgo.addDefaultLocale(en);
const timeAgo = new TimeAgo("en-US");

export default function timeSince(time: number) {
  const now = Date.now();
  return timeAgo.format(now - (now - time), "round-minute");
}
