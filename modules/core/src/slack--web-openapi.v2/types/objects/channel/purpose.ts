import { TopicPurposeCreator } from "../../definitions";
import { exact, type, Int, string } from "io-ts";

export const ChannelPurpose = exact(
  type({
    creator: TopicPurposeCreator,
    last_set: Int,
    value: string
  })
);
