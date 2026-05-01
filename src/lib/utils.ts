export function cx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

export function excerpt(text: string, max = 170) {
  if (text.length <= max) return text;
  return `${text.slice(0, max).trim()}...`;
}

export function cleanPageTitle(title: string) {
  return title
    .replace(/\s+-\s+Compañeros-Jbk.*$/i, "")
    .replace(/\s+-\s+Compañeros-JBK.*$/i, "")
    .replace(/\s+-\s+Compañeros.*$/i, "")
    .replace(/\.\.\.$/, "")
    .trim();
}
