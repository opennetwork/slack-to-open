import * as t from "io-ts";

export const Im = t.exact(t.intersection([
  t.type({
    created: t.Int,
    id: Definitions.DmId,
    is_im: t.boolean,
    is_org_shared: t.boolean,
    is_user_deleted: t.boolean,
    user: Definitions.UserId
  }),
  t.partial({
    is_app_home: t.boolean,
    is_ext_shared: t.boolean,
    is_shared: t.boolean,
    priority: t.number
  })
]));