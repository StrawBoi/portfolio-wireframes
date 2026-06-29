export const START_LETTERS = "Ahmed M.".split("");
export const END_LETTERS = "Mostafa".split("");
export const DISPLAY_NAME = "Ahmed Mohsen Mostafa";

export function isMiddleInitialSignalIndex(
  index: number,
  letters: readonly string[] = START_LETTERS
): boolean {
  return letters[index] === "M" && letters[index + 1] === ".";
}

export function startLetterClassName(
  index: number,
  letterClass = "hero-squeeze__letter"
): string {
  const classes = [letterClass];
  if (START_LETTERS[index] === " ") classes.push(`${letterClass}--gap`);
  if (isMiddleInitialSignalIndex(index)) classes.push(`${letterClass}--signal`);
  if (START_LETTERS[index] === "." && START_LETTERS[index - 1] === "M") {
    classes.push(`${letterClass}--period`);
  }
  return classes.join(" ");
}

export function endLetterClassName(
  index: number,
  letterClass = "hero-squeeze__letter"
): string {
  return letterClass;
}

export function willemStartLetterClassName(index: number): string {
  return startLetterClassName(index, "willem-handoff__letter");
}

export function willemEndLetterClassName(index: number): string {
  return endLetterClassName(index, "willem-handoff__letter");
}
