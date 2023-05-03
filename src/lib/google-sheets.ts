import { GoogleSpreadsheet } from "google-spreadsheet";
import { NO_HEADER_MESSAGE, SURVEY } from "./constants";
import { getTimestamp } from "./utils";

async function getSpreadsheet() {
  const doc = new GoogleSpreadsheet(process.env.GOOGLE_SPREADSHEET_ID);
  await doc.useServiceAccountAuth({
    client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL as string,
    private_key: process.env.GOOGLE_PRIVATE_KEY as string,
  });
  await doc.loadInfo();
  return doc.sheetsByIndex[0];
}

const isNoHeaderError = (error: unknown) =>
  error instanceof Error ? error.message === NO_HEADER_MESSAGE : false;

const getHeaderRow = () => [
  "Timestamp",
  "Name",
  "Email",
  ...SURVEY.map((item, index) => `Q${index + 1}. ${item.title}`),
];

const parseData = (obj: any) =>
  Object.values(
    Object.keys(obj).reduce<any>((total, current) => {
      if (current.startsWith("q")) {
        const [prefix, ques_no, arg] = current.split("-");
        if (typeof arg === "undefined") {
          total[current] = Array.isArray(obj[current])
            ? obj[current]
            : [obj[current]];
        } else {
          total[`${prefix}-${ques_no}`] =
            typeof obj[`${prefix}-${ques_no}`] === "undefined"
              ? [obj[current]]
              : Array.isArray(obj[`${prefix}-${ques_no}`])
              ? [...obj[`${prefix}-${ques_no}`], obj[current]]
              : [obj[`${prefix}-${ques_no}`], obj[current]];
        }
      } else {
        total[current] = obj[current];
      }
      return total;
    }, {})
  ).map((i) => (Array.isArray(i) ? i.join(",") : i)) as Array<number | string>;

export const saveUserResponse = async (data: any) => {
  const timestamp = getTimestamp();
  const sheet = await getSpreadsheet();
  const parsedData = [timestamp, ...parseData(data)];
  try {
    await sheet.addRow(parsedData);
  } catch (error) {
    if (isNoHeaderError(error)) {
      await sheet.setHeaderRow(getHeaderRow());
      await sheet.addRow(parsedData);
    }
  }
};
