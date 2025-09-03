export function getInitials(name?: string) {
  if (!name) return '';
  const names = name.split(' ');
  const initials = names.map((n) => n[0].toUpperCase()).join('');
  return initials.slice(0, 2);
}
