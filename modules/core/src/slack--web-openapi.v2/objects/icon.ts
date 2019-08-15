import * as t from "io-ts";

export const Icon = t.partial({
  image_102: t.string,
  image_132: t.string,
  image_230: t.string,
  image_34: t.string,
  image_44: t.string,
  image_68: t.string,
  image_88: t.string,
  image_default: t.boolean
});