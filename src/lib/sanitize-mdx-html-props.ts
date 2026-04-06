const STYLE_DECLARATION_SEPARATOR = ";";
const STYLE_PROPERTY_SEPARATOR = ":";

const toCamelCase = (value: string): string =>
  value.replaceAll(/[-:]([a-z])/g, (_, char: string) => char.toUpperCase());

const parseStyleValue = (style: string): Record<string, string> =>
  style
    .split(STYLE_DECLARATION_SEPARATOR)
    .map((declaration) => declaration.trim())
    .filter(Boolean)
    .reduce<Record<string, string>>((acc, declaration) => {
      const separatorIndex = declaration.indexOf(STYLE_PROPERTY_SEPARATOR);

      if (separatorIndex === -1) {
        return acc;
      }

      const property = declaration.slice(0, separatorIndex).trim();
      const value = declaration.slice(separatorIndex + 1).trim();

      if (!property || !value) {
        return acc;
      }

      acc[toCamelCase(property)] = value;
      return acc;
    }, {});

export const sanitizeMdxHtmlProps = (
  props: Record<string, unknown>
): Record<string, unknown> =>
  Object.entries(props).reduce<Record<string, unknown>>((acc, [key, value]) => {
    if (value == null) {
      return acc;
    }

    if (key === "class") {
      acc.className = value;
      return acc;
    }

    if (key === "for") {
      acc.htmlFor = value;
      return acc;
    }

    if (key === "style" && typeof value === "string") {
      acc.style = parseStyleValue(value);
      return acc;
    }

    if (key.startsWith("data-") || key.startsWith("aria-")) {
      acc[key] = value;
      return acc;
    }

    acc[toCamelCase(key)] = value;
    return acc;
  }, {});
