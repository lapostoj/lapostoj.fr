export const dateFormat = new Intl.DateTimeFormat('en-GB', {
  year: 'numeric',
  month: 'long',
  day: 'numeric',
});

export const dateWithoutDayFormat = new Intl.DateTimeFormat('en-GB', {
  year: 'numeric',
  month: 'long',
});

export const convertToKebabCase = (string) => string.replace(/([a-z])([A-Z])/g, '$1-$2')
  .replace(/\s+/g, '-')
  .toLowerCase();

export const frontmatterSortByDate = (frontmatter1, frontmatter2) => {
  if (frontmatter1.date < frontmatter2.date) {
    return -1;
  }
  if (frontmatter1.date > frontmatter2.date) {
    return 1;
  }
  return 0;
}

export default { dateFormat, dateWithoutDayFormat, convertToKebabCase, frontmatterSortByDate };
