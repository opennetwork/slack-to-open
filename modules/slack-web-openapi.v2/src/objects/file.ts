import * as t from "io-ts";
import * as Definitions from "../definitions";
import { Reaction } from "./reaction";

export const File = t.partial({
  channels: t.array(Definitions.ChannelId),
  comments_count: t.union([
    t.string,
    t.Int
  ]),
  created: t.union([
    t.string,
    t.Int
  ]),
  display_as_bot: t.boolean,
  editable: t.boolean,
  editor: Definitions.UserId,
  external_id: t.string,
  external_type: t.string,
  external_url: t.string,
  filetype: t.string,
  groups: t.array(Definitions.GroupId),
  has_rich_preview: t.boolean,
  id: Definitions.FileId,
  image_exif_rotation: t.union([
    t.string,
    t.Int
  ]),
  ims: t.array(Definitions.DmId),
  is_external: t.boolean,
  is_public: t.boolean,
  is_starred: t.boolean,
  is_tombstoned: t.boolean,
  last_editor: Definitions.UserId,
  mimetype: t.string,
  mode: t.string,
  name: t.string,
  num_stars: t.union([
    t.string,
    t.Int
  ]),
  original_h: t.union([
    t.string,
    t.Int
  ]),
  original_w: t.union([
    t.string,
    t.Int
  ]),
  permalink: t.string,
  permalink_public: t.string,
  pinned_info: Definitions.PinnedInfo,
  pinned_to: t.array(Definitions.ChannelReference),
  pretty_type: t.string,
  preview: t.null,
  public_url_shared: t.boolean,
  reactions: t.array(Reaction),
  shares: t.partial({
    private: t.type({

    }, "DefinitionsObjsFilePropertiesSharesPropertiesPrivate"),
    public: t.type({

    }, "DefinitionsObjsFilePropertiesSharesPropertiesPublic")
  }, "DefinitionsObjsFilePropertiesShares"),
  size: t.union([
    t.string,
    t.Int
  ]),
  source_team: Definitions.TeamReference,
  state: t.string,
  thumb_1024: t.string,
  thumb_1024_h: t.union([
    t.string,
    t.Int
  ]),
  thumb_1024_w: t.union([
    t.string,
    t.Int
  ]),
  thumb_160: t.string,
  thumb_360: t.string,
  thumb_360_h: t.union([
    t.string,
    t.Int
  ]),
  thumb_360_w: t.union([
    t.string,
    t.Int
  ]),
  thumb_480: t.string,
  thumb_480_h: t.union([
    t.string,
    t.Int
  ]),
  thumb_480_w: t.union([
    t.string,
    t.Int
  ]),
  thumb_64: t.string,
  thumb_720: t.string,
  thumb_720_h: t.union([
    t.string,
    t.Int
  ]),
  thumb_720_w: t.union([
    t.string,
    t.Int
  ]),
  thumb_80: t.string,
  thumb_800: t.string,
  thumb_800_h: t.union([
    t.string,
    t.Int
  ]),
  thumb_800_w: t.union([
    t.string,
    t.Int
  ]),
  thumb_960: t.string,
  thumb_960_h: t.union([
    t.string,
    t.Int
  ]),
  thumb_960_w: t.union([
    t.string,
    t.Int
  ]),
  timestamp: t.union([
    t.string,
    t.Int
  ]),
  title: t.string,
  updated: t.union([
    t.string,
    t.Int
  ]),
  url_private: t.string,
  url_private_download: t.string,
  user: t.string,
  user_team: Definitions.TeamReference,
  username: t.string
}, "DefinitionsObjsFile");
export type SlackFile = t.TypeOf<typeof File>;