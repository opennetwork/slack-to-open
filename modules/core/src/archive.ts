import {
  WebAPIState,
  WebAPIPerson,
  createWebAPIConversation,
  createWebAPIPerson,
  WebAPIEntityBase,
  WebAPICommentParent,
  WebAPIComment,
  createWebAPICommentParent,
  createWebAPIComment
} from "@opennetwork/web-api-conversation-channel-state";
import { SlackChannel, SlackMessage, SlackUser } from "@opennetwork/slack-to-open.slack-web-openapi.v2";
import { parseTS } from "./util";

function updateEntity(state: WebAPIState, entity: Partial<WebAPIEntityBase>): WebAPIState {
  return {
    ...state,
    mainEntityOfPage: Object.assign({}, state.mainEntityOfPage, entity)
  };
}

export function getUser(state: WebAPIState, id: string): WebAPIPerson {
  return state.mainEntityOfPage.audience.find(
    person => person.identifier === id
  );
}

function sortCommentsByCreated({ dateCreated: a }: WebAPIComment, { dateCreated: b }: WebAPIComment) {
  return a < b ? -1 : 1;
}

export function getCommentsForChannel(state: WebAPIState, messages: SlackMessage[]): WebAPICommentParent[] {
  return messages
    .map(
      message => ({
        ...createWebAPICommentParent(message.client_msg_id, getUser(state, message.user), ["textual"]),
        text: message.text,
        dateCreated: parseTS(message.ts),
        comment: (message.replies || [])
          .map(({ ts, user }) => messages.find(message => message.ts === ts && message.user === user))
          .filter(value => value)
          .map(message => ({
            ...createWebAPIComment(message.client_msg_id, getUser(state, message.user), ["textual"]),
            text: message.text,
            dateCreated: parseTS(message.ts)
          }))
      })
    )
    .sort(sortCommentsByCreated);
}

export function appendArchiveUsers(state: WebAPIState, users: SlackUser[]) {
  return updateEntity(state, {
    audience: users.map(user => ({
      ...createWebAPIPerson(
        user.id,
        user.real_name || user.name
      ),
      dateModified: parseTS(user.updated)
    }))
  });
}

export function appendArchiveChannels(state: WebAPIState, channels: SlackChannel[], getComments?: (channel: SlackChannel) => WebAPICommentParent[]): WebAPIState {
  return updateEntity(state, {
    hasPart: channels.map(channel => {
      const conversation = {
        ...createWebAPIConversation(
          channel.id,
          channel.name,
          undefined,
          getUser(state, channel.creator)
        ),
        dateCreated: parseTS(channel.created)
      };
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
