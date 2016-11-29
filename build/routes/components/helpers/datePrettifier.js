const options = {
  completeshort: {
    weekday: 'short',
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  },
  completelong: {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  },
};

const datePrettifier = (isoDate, option, timeZone) => {
  const date = new Date(isoDate);
  const optionUsed = Object.assign({}, options[option], {
    timeZone,
  });
  const language = 'en-GB';

  return date.toLocaleDateString(language, optionUsed);
};

export default datePrettifier;
