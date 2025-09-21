export const formatDate = (date: string) =>
  new Intl.DateTimeFormat('en-DK', {
    dateStyle: 'medium',
    timeStyle: 'short',
  }).format(new Date(date));
