import { customAlphabet } from "nanoid/non-secure";

export const generateId = (size = 10) => {
  const nanoid = customAlphabet(noLookAlikes);

  return nanoid(size);
};

const noLookAlikes = "346789ABCDEFGHJKLMNPQRTUVWXYabcdefghijkmnpqrtwxyz";
