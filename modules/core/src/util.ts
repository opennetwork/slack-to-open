import { SlackTs } from "@opennetwork/slack-to-open.slack-web-openapi.v2";
import { Int } from "io-ts";

export function parseTS<T extends (SlackTs | Int | string | number)>(ts: T): string | undefined {
  if (typeof ts === "string") {
    return parseTS(+ts);
  }
  if (typeof ts !== "number") {
    return undefined;
  }
  return new Date(ts * 1000).toISOString();
}
