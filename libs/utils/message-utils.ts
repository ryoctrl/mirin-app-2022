import { SystemMessages } from "libs/messages/system";

export const generateMessageByWork = (
  key: keyof typeof SystemMessages,
  work: Work
) => {
  const message = SystemMessages[key];

  return message.replaceAll("{{title}}", work.title);
};
