import type { ZodError } from "zod";

export interface FormState {
  error?: string;
  fieldErrors?: Record<string, string>;
}

/**
 * Flatten a Zod failure into a form-level summary plus per-field messages, so
 * each input can render its own error instead of a single generic banner.
 */
export function zodToFormState(error: ZodError): FormState {
  const fieldErrors: Record<string, string> = {};
  const formLevel: string[] = [];

  for (const issue of error.issues) {
    const key = issue.path[0];
    if (typeof key === "string") {
      // Keep the first message per field — later ones are usually redundant.
      fieldErrors[key] ??= issue.message;
    } else {
      formLevel.push(issue.message);
    }
  }

  const count = Object.keys(fieldErrors).length;
  const error_ =
    formLevel[0] ??
    (count > 0
      ? "Some fields need fixing before this can be saved."
      : "The submitted data was not valid.");

  return { error: error_, fieldErrors: count > 0 ? fieldErrors : undefined };
}

/**
 * Turn a Prisma write failure into something actionable. Matches on the error
 * code rather than importing the error class, which lives behind the custom
 * generated-client output path.
 */
export function prismaToFormState(error: unknown, subject: string): FormState {
  const code = (error as { code?: string })?.code;
  const meta = (error as { meta?: { target?: string[] | string; cause?: string } })?.meta;

  switch (code) {
    case "P2002": {
      const target = Array.isArray(meta?.target) ? meta.target.join(", ") : meta?.target;
      const field = target ?? "one of the unique fields";
      return {
        error: `Another ${subject} already uses that ${field}. Pick a different value.`,
        fieldErrors: typeof target === "string" ? { [target]: "Already taken." } : undefined,
      };
    }
    case "P2025":
      return {
        error: `That ${subject} no longer exists — it may have been deleted in another tab.`,
      };
    case "P2000":
      return { error: `One of the values is too long to store. Please shorten it.` };
    case "P2003":
      return { error: `This ${subject} is still referenced elsewhere and can't be changed.` };
    case "P1001":
    case "P1002":
      return {
        error: "Couldn't reach the database. Check your connection and try again in a moment.",
      };
    default: {
      const message = error instanceof Error ? error.message : String(error);
      // Surface the real reason — a generic "failed to save" makes these
      // impossible to diagnose from the admin UI alone.
      return { error: `Couldn't save the ${subject}: ${message.split("\n").pop()?.trim()}` };
    }
  }
}
