import { WebAPIState, WebAPIPerson, createWebAPIConversation, createWebAPIPerson } from "@opennetwork/web-api-conversation-channel-state";
import { Channel, User } from "./slack--web-openapi.v2/objects";
import { TypeOf } from "io-ts";

export function appendArchiveUsers(state: WebAPIState, users: TypeOf<User>) {
  return {
    ...state,
    mainEntityOfPage: {
      ...state.mainEntityOfPage,
      audience: users.map(
        (user: TypeOf<typeof User.type>) => ({
          ...createWebAPIPerson(
            user.id,
            user.real_name || user.name
          )
        })
      )
    }
  };
}

function getUser(state: WebAPIState, id: string): WebAPIPerson {
  return state.mainEntityOfPage.audience.find(
    person => person.identifier === id
  );
}

export function appendArchiveChannels(state: WebAPIState, channels: TypeOf<Channel>): WebAPIState {
  return {
    ...state,
    mainEntityOfPage: {
      ...state.mainEntityOfPage,
      hasPart: channels.map(
        (channel: TypeOf<Channel>) => ({
          ...createWebAPIConversation(
            channel.id,
            channel.name,
            undefined,
            getUser(state, channel.creator)
          )
        })
      )
    }
  };
}
