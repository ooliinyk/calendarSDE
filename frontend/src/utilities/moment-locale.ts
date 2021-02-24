import moment, { Moment } from "moment";
export const locale_cz = moment.updateLocale("cz", {
  months: [
    "Leden",
    "Únor",
    "Březen",
    "Duben",
    "Květen",
    "Červen",
    "Červenec",
    "Srpen",
    "Září",
    "Říjen",
    "Listopad",
    "Prosinec",
  ],
  monthsShort: [
    "Led",
    "Úno",
    "Bře",
    "Dub",
    "Kvě",
    "Čer",
    "Čer",
    "Srp",
    "Zář",
    "Říj",
    "Lis",
    "Pro",
  ],
  weekdaysShort: ["Ne", "Po", "Út", "St", "Čt", "Pá", "So"],
  weekdays: [
    "Neděle",
    "Pondělí",
    "Úterý",
    "Středa",
    "Čtvrtek",
    "Pátek",
    "Sobota",
  ],
  weekdaysMin: ["Ne", "Po", "Út", "St", "Čt", "Pá", "So"],
});

export const sortMonthTitleDate = (a: string, b: string): any => {
  const momentA = moment(a, "YYYY-M");
  const momentB = moment(b, "YYYY-M");

  return momentA.diff(momentB);
};

export const sortEventDate = (
  a: string | undefined,
  b: string | undefined
): any => {
  const momentA = moment(a);
  const momentB = moment(b);

  return momentA.diff(momentB);
};

export const formatMomentDate = (date: string): string => {
  const momentDate = moment(date);
  return momentDate.format("DD.MM.YYYY");
};

export const formatMomentTime = (date: string): string => {
  const momentDate = moment(date);
  return momentDate.format("HH:mm");
};

export const reformatDate = (
  date: string | undefined
): { date: string; time: string } => {
  const momentDate = moment(date).utc();
  console.log(momentDate);
  return {
    date: momentDate.format("DD.MM.YYYY"),
    time: momentDate.format("HH:mm"),
  };
};

export const formatDate = (date: string, time: string): Moment => {
  return moment(`${date}.${time}`, "DD.MM.YYYY.HH:mm");
};
//.format("YYYY-MM-DDTHH:mm");
