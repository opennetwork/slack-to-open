import * as t from "io-ts";
import * as Definitions from "../definitions";

export const UserProfileShort = t.type({
  avatar_hash: t.string,
  display_name: t.string,
  first_name: t.string,
  image_72: t.string,
  is_restricted: t.boolean,
  is_ultra_restricted: t.boolean,
  name: t.string,
  real_name: t.string,
  team: Definitions.WorkspaceId
});