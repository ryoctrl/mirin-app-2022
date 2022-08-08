import { routes } from "libs/routes";

type ParamsDict = {
  [key in string]: string;
};

export const generatePath = (
  path: typeof routes[keyof typeof routes],
  params: ParamsDict
) => {
  let result: string = path;
  Object.entries(params).forEach(([k, v]) => {
    result = result.replaceAll(new RegExp(`\\[${k}\\]`, "g"), v);
  });
  return result;
};
