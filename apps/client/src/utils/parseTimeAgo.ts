const parseTimeAgo = (date: Date) => {
  const now = new Date();
  const diffInMilliseconds = now.getTime() - date.getTime();

  const diffInSeconds = Math.round(diffInMilliseconds / 1000);
  const diffInMinutes = Math.round(diffInMilliseconds / (1000 * 60));
  const diffInHours = Math.round(diffInMilliseconds / (1000 * 60 * 60));
  const diffInDays = Math.round(diffInMilliseconds / (1000 * 60 * 60 * 24));
  const diffInWeeks = Math.round(
    diffInMilliseconds / (1000 * 60 * 60 * 24 * 7)
  );
  const diffInMonths = Math.round(
    diffInMilliseconds / (1000 * 60 * 60 * 24 * 30)
  ); // Aproximado
  const diffInYears = Math.round(
    diffInMilliseconds / (1000 * 60 * 60 * 24 * 365)
  ); // Aproximado

  const rtf = new Intl.RelativeTimeFormat("en", { numeric: "auto" });

  if (diffInSeconds < 60) {
    return rtf.format(-diffInSeconds, "second");
  } else if (diffInMinutes < 60) {
    return rtf.format(-diffInMinutes, "minute");
  } else if (diffInHours < 24) {
    return rtf.format(-diffInHours, "hour");
  } else if (diffInDays < 7) {
    return rtf.format(-diffInDays, "day");
  } else if (diffInWeeks < 4) {
    return rtf.format(-diffInWeeks, "week");
  } else if (diffInMonths < 12) {
    return rtf.format(-diffInMonths, "month");
  } else {
    return rtf.format(-diffInYears, "year");
  }
};

export default parseTimeAgo;
