import {
  WebAPIState,
  WebAPIPerson,
  createWebAPIConversation,
  createWebAPIPerson,
  WebAPIEntityBase,
  WebAPICommentParent,
  WebAPIComment,
  createWebAPICommentParent,
  createWebAPIComment,
  createWebAPICommentResponseInteractionCounter,
  createWebAPICommentResponseAction,
  AccessMode,
  WebAPICommentResponseInteractionCounter
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

function getInteractionCounters(state: WebAPIState, reactions: SlackMessage["reactions"]): WebAPICommentResponseInteractionCounter[] {
  if (!reactions) {
    return [];
  }
  return reactions.map(({ name, count, users }) => ({
    ...createWebAPICommentResponseInteractionCounter(
      createWebAPICommentResponseAction(
        users.map(user => getUser(state, user)),
        name
      )
    ),
    userInteractionCount: typeof count === "string" ? +count : count
  }));
}

function getMessageParts(state: WebAPIState, message: SlackMessage): WebAPIComment[] {
  return message.files
    .map(
      file => {
        const comment = {
          ...createWebAPIComment(file.id, getUser(state, file.user || message.user), []),
          dateCreated: parseTS(file.timestamp),
          url: file.url_private,
          encodingFormat: file.mimetype,
          name: file.name,
          headline: file.title
        };
        if (file.reactions) {
          comment.interactionType = getInteractionCounters(state, file.reactions);
        }
        if (file.mimetype && file.mimetype.startsWith("image/")) {
          comment.accessMode.push("visual");
        }
        if (file.mimetype && file.mimetype.startsWith("video/")) {
          comment.accessMode.push("visual");
          comment.accessMode.push("auditory");
        }
        if (file.mimetype && file.mimetype.startsWith("audio/")) {
          comment.accessMode.push("auditory");
        }
        return comment;
      }
    );
}

export function getCommentForMessage(state: WebAPIState, message: SlackMessage): WebAPIComment {
  const comment =  {
    ...createWebAPIComment(message.client_msg_id, getUser(state, message.user), []),
    dateCreated: parseTS(message.ts) || new Date().toISOString()
  };

  if (message.reactions) {
    comment.interactionType = getInteractionCounters(state, message.reactions);
  }

  if (message.text) {
    comment.text = message.text;
    comment.accessMode = ["textual"];
  }

  if (message.files) {
    comment.hasPart = getMessageParts(state, message);
  }

  return comment;
}

export function getCommentsForMessage(state: WebAPIState, message: SlackMessage, messages: SlackMessage[]): WebAPIComment[] {
  return (message.replies || [])
    .map(({ ts, user }) => messages.find(message => message.ts === ts && message.user === user))
    .filter(value => value)
    .map(message => getCommentForMessage(state, message))
    .sort(sortCommentsByCreated);
}

export function getCommentsForChannel(state: WebAPIState, messages: SlackMessage[]): WebAPICommentParent[] {
  return messages
    .map(
      message => ({
        ...getCommentForMessage(state, message),
        comment: getCommentsForMessage(state, message, messages)
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
      dateModified: parseTS(user.updated) || new Date().toISOString()
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
        dateCreated: parseTS(channel.created) || new Date().toISOString()
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
