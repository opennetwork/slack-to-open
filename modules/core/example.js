import { createState, appendArchiveChannels, appendArchiveUsers, getUser } from "./dist";
import channels from "./archive/channels";
import users from "./archive/users";
import { writeFileSync, readFileSync, readdirSync } from "fs";
import { createWebAPICommentParent } from "@opennetwork/web-api-conversation-channel-state";

let ourState = createState();

ourState = appendArchiveUsers(ourState, users);
ourState = appendArchiveChannels(ourState, channels, channel => {
  const channelPath = `archive/${channel.name}`;
  const files = readdirSync(channelPath);
  return files
    .filter(file => /\.json$/.test(file))
    .map(
      file => {
        const contentsJSON = readFileSync(`${channelPath}/${file}`);
        const contents = JSON.parse(contentsJSON);
        return contents.map(
          message => ({
            ...createWebAPICommentParent(message.id, getUser(ourState, message.creator), ["textual"]),
            text: message.text
          })
        )
      }
    )
    .reduce(
      (messages, fileMessages) => messages.concat(fileMessages),
      []
    )
});

writeFileSync("archive/state.json", JSON.stringify(ourState, null, "  "));
