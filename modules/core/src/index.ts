import { WebAPIState, createWebAPIState, createWebAPIEntity } from "@opennetwork/web-api-conversation-channel-state";
import { WebAPI } from "schema-dts";

export * from "./archive";
export * from "./util";

const baseState: WebAPIState & Pick<WebAPI, "termsOfService" | "url" | "documentation" | "provider"> = {
  ...createWebAPIState(
    "Slack API",
    createWebAPIEntity(
      "",
      "Default Organization"
    )
  ),
  termsOfService: "https://slack.com/legal",
  url: "https://api.slack.com/",
  documentation: "https://api.slack.com/",
  provider: {
    "@type": "Organization",
    url: "https://slack.com",
    name: "Slack"
  }
};

export function createState(): WebAPIState {
  return {
    ...baseState
  };
}
