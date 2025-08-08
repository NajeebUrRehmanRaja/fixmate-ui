export const parseResponse = (response) => {
  const replacedResponse = response
    .replace("```json", "")
    .replace("```", "")
    .replace("\n", "")
    .replace("\r", "")
    .replace("\t", "");

  return JSON.parse(replacedResponse);
};
