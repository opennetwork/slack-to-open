import * as t from "io-ts";

export const TeamProfileField = t.intersection([
  t.type({
    hint: t.string,
    id: t.string,
    label: t.string,
    options: t.array(t.string),
    ordering: t.number,
    type: t.string
  }),
  t.partial({
    field_name: t.string,
    is_hidden: t.boolean,
    possible_values: t.array(t.string)
  })
], "DefinitionsObjsTeamProfileField");
export type SlackTeamProfileField = t.TypeOf<typeof TeamProfileField>;