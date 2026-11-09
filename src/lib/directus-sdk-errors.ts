export const extractDirectusError = (
  error: unknown
): {
  message: string;
  status?: number;
  statusText?: string;
  details?: unknown;
} => {
  if (error instanceof Error) {
    const errorAny = error as unknown as {
      response?: { status?: number; statusText?: string };
      status?: number;
      statusText?: string;
      errors?: unknown[];
    };

    const status = errorAny.response?.status ?? errorAny.status;
    const statusText = errorAny.response?.statusText ?? errorAny.statusText;
    const details = errorAny.errors ?? errorAny.response;

    return {
      details,
      message: error.message,
      status,
      statusText,
    };
  }

  return {
    message: String(error),
  };
};

const errorText = (error: unknown): string => {
  const extracted = extractDirectusError(error);
  return `${extracted.message} ${JSON.stringify(extracted.details ?? "")}`.toLowerCase();
};

export const isDirectusCollectionAccessError = (error: unknown): boolean =>
  errorText(error).includes("permission to access collection");

const isUnknownFieldError = (text: string, fieldHints: string[]): boolean => {
  if (text.includes("invalid field") || text.includes("unknown field")) {
    return true;
  }
  if (text.includes("don't have permission to access field")) {
    return true;
  }
  return fieldHints.some((hint) => text.includes(hint));
};

export const isUnknownWorkInProgressFieldError = (error: unknown): boolean => {
  if (isDirectusCollectionAccessError(error)) {
    return false;
  }
  return isUnknownFieldError(errorText(error), ["work_in_progress"]);
};

export const isUnknownUsesSortFieldError = (error: unknown): boolean => {
  if (isDirectusCollectionAccessError(error)) {
    return false;
  }
  return isUnknownFieldError(errorText(error), ["category_sort", "sort"]);
};
