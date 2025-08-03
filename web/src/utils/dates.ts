export const formatDate = (date: string) => {
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  const dateObject = new Date(date);

  return dateObject.toLocaleDateString("en-US", options);
};
