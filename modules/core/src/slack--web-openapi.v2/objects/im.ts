import * as t from "io-ts";
import * as Definitions from "../definitions";

export const Im = t.intersection([
  t.type({
    created: t.union([
      t.string,
      t.Int
    ]),
    id: Definitions.DmId,
    user: Definitions.UserId
  }),
  t.partial({
    is_app_home: t.boolean,
    is_ext_shared: t.boolean,
    is_im: t.boolean,
    is_org_shared: t.boolean,
    is_shared: t.boolean,
    is_user_deleted: t.boolean,
    priority: t.number
  })
], "DefinitionsObjsIm");