export const parseError = (error: unknown) => {
  return { error: error instanceof Error ? error.message : "Unknown Error !" };
};
