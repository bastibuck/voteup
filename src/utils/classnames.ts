/**
 * conditionally apply and combine classNames into a single className string
 *
 * @param conditionalClasses An array of tuples of className(s) and conditions for applying them
 * @returns string
 */
export const cns = (
  conditionalClasses: [classNames: string | string[], condition?: boolean][]
): string =>
  conditionalClasses
    .filter((cn) => cn[1] ?? true)
    .map((cn) => (typeof cn[0] === "string" ? cn[0] : cn[0].join(" ")))
    .join(" ");
