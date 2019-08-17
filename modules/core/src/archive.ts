import {
  WebAPIState,
  WebAPIPerson,
  createWebAPIConversation,
  createWebAPIPerson,
  WebAPIEntityBase
} from "@opennetwork/web-api-conversation-channel-state";
import { SlackChannel, SlackUser } from "@opennetwork/slack-to-open.slack-web-openapi.v2";

function updateEntity(state: WebAPIState, entity: Partial<WebAPIEntityBase>): WebAPIState {
  return {
    ...state,
    mainEntityOfPage: {
      ...state.mainEntityOfPage,
      ...entity
    }
  };
}

export function appendArchiveUsers(state: WebAPIState, users: SlackUser) {
  return updateEntity(state, {
    audience: users.map(
      (user: SlackUser) => ({
        ...createWebAPIPerson(
          user.id,
          user.real_name || user.name
        )
      })
    )
  });
}

function getUser(state: WebAPIState, id: string): WebAPIPerson {
  return state.mainEntityOfPage.audience.find(
    person => person.identifier === id
  );
}

export function appendArchiveChannels(state: WebAPIState, channels: SlackChannel): WebAPIState {
  return updateEntity(state, {
    hasPart: channels.map(
      (channel: SlackChannel) => ({
        ...createWebAPIConversation(
          channel.id,
          channel.name,
          undefined,
          getUser(state, channel.creator)
        )
      })
    )
  });
}
