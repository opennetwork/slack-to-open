import { SlackTs } from "@opennetwork/slack-to-open.slack-web-openapi.v2";
import { Int } from "io-ts";

export function parseTS(ts: SlackTs | Int | string | number): string {
  if (typeof ts === "string") {
    return parseTS(+ts);
  }
  if (typeof ts !== "number") {
    throw new Error("Invalid timestamp");
  }
  return new Date(ts * 1000).toISOString();
}
