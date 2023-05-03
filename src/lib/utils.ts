import { format } from "date-fns";

export const parseError = (error: unknown) => {
  return { error: error instanceof Error ? error.message : "Unknown Error !" };
};

export const getTimestamp = () => format(new Date(), "Pp");

export const getGooglePrivateKey = () =>
  (process.env.GOOGLE_PRIVATE_KEY as string).replace(/\\n/g, "\n");
