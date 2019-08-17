import * as t from "io-ts";

export const TopicPurposeCreator = t.string;
export type SlackTopicPurposeCreator = t.TypeOf<typeof TopicPurposeCreator>;