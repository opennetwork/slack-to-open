import {
  ImageObject,
  AudioObject,
  Organization,
  CreativeWork,
  Comment,
  Person,
  WebAPI,
  DateTime,
  Text,
  Thing,
  DefinedTerm,
  VideoObject,
  Conversation
} from "schema-dts";

export type SlackOrganization = Organization & {
  url: "https://slack.com";
  name: "Slack";
  image: ImageObject,
  termsOfService: "https://slack.com/legal";
};

export type WebAPIPerson = Person & {
  identifier: Text;
  dateModified: DateTime;
  name: Text;
  alternateName: Text;
  image?: ImageObject;
};

export type WebAPICreativeWork = CreativeWork & {
  identifier: Text;
  dateCreated: DateTime;
  dateModified: DateTime;
  creator: WebAPIPerson;
};

// We can infer typing's if we wanted to... this doesn't belong here though
// ["auditory", "visual"] | ["auditory"] | ["textual", "visual"] | ["textual", "auditory", "visual"]
export type WebAPIMessageMediaBase = Comment & WebAPICreativeWork & {
  // Its either going to be one of:
  // - One of visual, textual, auditory
  // - auditory & visual, aka Video with sound, no captions
  // - textual & visual, aka image with alt
  // - textual & auditory & visual, aka video with sound and captions
  accessMode: ("visual" | "textual" | "auditory")[];
  text?: Text;
  image?: ImageObject;
  audio?: AudioObject;
  video?: VideoObject;
};

export type WebAPIMessage = WebAPIMessageMediaBase & {
  comment: WebAPIMessageMediaBase[];
};

export type WebAPIChannelActive = DefinedTerm & {
  termCode: "Active"
};

export type WebAPIChannelArchived = DefinedTerm & {
  termCode: "Archived"
};

export type WebAPIChannel = Conversation & WebAPICreativeWork & {
  name: Text;
  about: Thing;
  audience: WebAPIPerson[];
  creativeWorkStatus: WebAPIChannelActive | WebAPIChannelArchived;
  hasPart: WebAPIMessage[];
};

export type WebAPIState = CreativeWork & {
  name: Text;
  identifier: Text;
  audience: WebAPIPerson[];
  dateModified: DateTime;
  hasPart: WebAPIChannel[];
};

export type State = WebAPI & {
  name: "Slack API";
  url: "https://api.slack.com/";
  documentation: "https://api.slack.com/";
  provider: SlackOrganization;
  mainEntityOfPage: WebAPIState;
};
