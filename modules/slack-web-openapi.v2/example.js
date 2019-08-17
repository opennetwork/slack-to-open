import * as Slack from "./dist";
import { PathReporter } from "io-ts/lib/PathReporter";
import * as t from "io-ts";

const channel = {
  "id": "CGETLR1CG",
  "name": "devops",
  "created": "1551080073",
  "creator": "UGGN7P5QF",
  "is_archived": false,
  "is_general": false,
  "members": [
    "UGEULCGSU",
    "UGF3GAK33",
    "UGFGLLZ27",
    "UGFH0ELNP",
    "UGFK754JG",
    "UGFKMMRC0",
    "UGFPPV0SW",
    "UGG55CKEH",
    "UGGB6F03V",
    "UGGEEDX6E",
    "UGGEY7SE8",
    "UGGFJHA2Y",
    "UGGLU922E",
    "UGGN7P5QF",
    "UGGNPELKZ",
    "UGH4Z4PD4",
    "UGHS6MN1L",
    "UGKRZQF47",
    "UGN6321NU",
    "UGPFFR0PJ",
    "UGPFVR6MB",
    "UGQ7M6WRZ",
    "UGRM3JAA1",
    "UH0FD2J80",
    "UH4A13Y8Y",
    "UHD2RT9GD",
    "UKL6GM23D",
    "UKQGMSADB",
    "UKVJVE135"
  ],
  "topic": {
    "value": "",
    "creator": "",
    "last_set": "0"
  },
  "purpose": {
    "value": "",
    "creator": "",
    "last_set": "0"
  }
};

const topic = t.type({
  creator: Slack.TopicPurposeCreator,
  last_set: t.union([
    t.string,
    t.Int
  ]),
  value: t.string
});

console.log(topic.is(channel.topic));
console.log(Slack.Channel.is(channel));
console.log(PathReporter.report(Slack.Channel.decode(channel)));
