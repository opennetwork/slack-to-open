import { WebAPIState, createWebAPIState, createWebAPIEntity } from "@opennetwork/web-api-conversation-channel-state";

export * from "./archive";

const baseState: WebAPIState = {
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
    name: "Slack",
    image: {
      "@type": "ImageObject"
    }
  }
};

export function createState(): WebAPIState {
  return {
    ...baseState
  };
}
