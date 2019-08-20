import { createState, appendArchiveChannels, appendArchiveUsers, getCommentsForChannel } from "./dist";
import channels from "./archive/channels";
import users from "./archive/users";
import { writeFileSync, readFileSync, readdirSync } from "fs";

let ourState = createState();

ourState = appendArchiveUsers(ourState, users);
ourState = appendArchiveChannels(ourState, channels, channel => {
  const channelPath = `archive/${channel.name}`;
  const files = readdirSync(channelPath);
  const messages = files
    .filter(file => /\.json$/.test(file))
    .map(
      file => {
        const contentsJSON = readFileSync(`${channelPath}/${file}`);
        return JSON.parse(contentsJSON);
      }
    )
    .reduce((array, value) => array.concat(value), []);
  return getCommentsForChannel(ourState, messages);
});

writeFileSync("archive/state.json", JSON.stringify(ourState, null, "  "));
