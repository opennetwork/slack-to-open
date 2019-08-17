import {
  WebAPIState,
  WebAPIPerson,
  createWebAPIConversation,
  createWebAPIPerson,
  WebAPIEntityBase,
  WebAPICommentParent
} from "@opennetwork/web-api-conversation-channel-state";
import { SlackChannel, SlackUser } from "@opennetwork/slack-to-open.slack-web-openapi.v2";

function updateEntity(state: WebAPIState, entity: Partial<WebAPIEntityBase>): WebAPIState {
  return {
    ...state,
    mainEntityOfPage: Object.assign({}, state.mainEntityOfPage, entity)
  };
}

export function appendArchiveUsers(state: WebAPIState, users: SlackUser[]) {
  return updateEntity(state, {
    audience: users.map(user => createWebAPIPerson(
      user.id,
      user.real_name || user.name
      )
    )
  });
}

export function getUser(state: WebAPIState, id: string): WebAPIPerson {
  return state.mainEntityOfPage.audience.find(
    person => person.identifier === id
  );
}

export function appendArchiveChannels(state: WebAPIState, channels: SlackChannel[], getComments?: (channel: SlackChannel) => WebAPICommentParent[]): WebAPIState {
  return updateEntity(state, {
    hasPart: channels.map(channel => {
      const conversation = createWebAPIConversation(
        channel.id,
        channel.name,
        undefined,
        getUser(state, channel.creator)
      );
      if (!getComments) {
        return conversation;
      }
      return {
        ...conversation,
        hasPart: getComments(channel)
      };
    })
  });
}
