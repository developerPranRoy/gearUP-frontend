import type { UseFormSetError, FieldValues, Path } from "react-hook-form";
import { toast } from "sonner";
import { ApiError } from "@/lib/api-client";

/**
 * Backend validation errors arrive as errorDetails: [{ path: "email", message }].
 * If the path matches a field on this form, show it inline (RHF); otherwise
 * fall back to a toast so nothing silently disappears.
 */
export function handleFormError<T extends FieldValues>(
  error: unknown,
  setError: UseFormSetError<T>
) {
  if (error instanceof ApiError) {
    let matchedAField = false;

    for (const detail of error.errorDetails) {
      const path = String(detail.path);
      if (path) {
        setError(path as Path<T>, { message: detail.message });
        matchedAField = true;
      }
    }

    if (!matchedAField) {
      toast.error(error.message);
    }
    return;
  }

  toast.error("Something went wrong. Please try again.");
}
