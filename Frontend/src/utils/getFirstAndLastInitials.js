function getFirstAndLastInitials(name) {
  // Split the name by spaces
  const words = name.split(" ");

  // Check if the name has at least one word
  if (words.length === 0) return "";

  // Get the first character of the first word
  const firstInitial = words[0][0];

  // Get the first character of the last word
  const lastInitial = words[words.length - 1][0];

  // Concatenate the initials
  const initials = firstInitial + lastInitial;

  return initials;
}

export default getFirstAndLastInitials;
