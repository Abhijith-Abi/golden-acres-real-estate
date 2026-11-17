import type { EnquiryPayload } from "@/lib/validations/enquiry";
import type { ContactPayload } from "@/lib/validations/contact";
import { contact } from "@/config/contact";

export type SubmissionContext = {
  kind: "enquiry" | "contact";
  property?: { title: string; location: string; slug: string };
  project?: { title: string; location: string };
};

type Result =
  | { status: "success"; message: string }
  | { status: "whatsapp"; message: string; url: string }
  | { status: "error"; message: string };

/**
 * Delivers a form submission.
 *
 * 1. If ENQUIRY_WEBHOOK_URL is configured, the enquiry is delivered by
 *    POST /api/enquiries (server-side; the URL never reaches the client).
 * 2. If no backend is configured yet, we're honest about it: the form data
 *    is handed off to WhatsApp (pre-filled) and the user is told exactly
 *    where their enquiry went. We never pretend it was saved.
 */
export async function submitForm(
  values: EnquiryPayload | ContactPayload,
  context: SubmissionContext
): Promise<Result> {
  const endpointConfigured =
    typeof process !== "undefined" &&
    // Client builds never contain the secret; this flag is inlined at build
    // time as true/false only (NOT the URL itself).
    process.env.NEXT_PUBLIC_ENQUIRY_BACKEND_CONFIGURED === "true";

  if (!endpointConfigured) {
    return {
      status: "whatsapp",
      message:
        "Enquiry delivery isn't set up on this website yet — opening WhatsApp with your details instead.",
      url: buildHandoffUrl(values, context),
    };
  }

  try {
    const res = await fetch("/api/enquiries", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...values, kind: context.kind }),
    });
    const data = (await res.json()) as { ok: boolean; message?: string };
    if (res.ok && data.ok) {
      return {
        status: "success",
        message: data.message ?? "Enquiry received — we'll be in touch shortly.",
      };
    }
    return {
      status: "error",
      message: data.message ?? "Something went wrong. Please try WhatsApp instead.",
    };
  } catch {
    return {
      status: "error",
      message: "Network problem — please try again or reach us on WhatsApp.",
    };
  }
}

/** Builds the pre-filled WhatsApp fallback message from raw form values. */
function buildHandoffUrl(
  values: EnquiryPayload | ContactPayload,
  context: SubmissionContext
): string {
  const lines: string[] = ["Hello Golden Acres Real Estates,", ""];

  if (context.property) {
    lines.push(
      `I'm interested in *${context.property.title}* (${context.property.location}).`,
      ""
    );
  }
  if (context.project) {
    lines.push(`I'd like to know more about *${context.project.title}*.`, "");
  }

  lines.push(`Name: ${values.name}`, `Phone: ${values.phone}`, `Email: ${values.email}`);

  if ("propertyType" in values) {
    lines.push(
      `Looking for: ${values.propertyType}`,
      `Location: ${values.location}`,
      `Budget: ${values.budget}`
    );
  }
  if ("subject" in values && values.subject) {
    lines.push(`Subject: ${values.subject}`);
  }

  const message = "message" in values ? values.message : "";
  if (message) lines.push("", `Message: ${message}`);

  const text = lines.join("\n");
  return `https://wa.me/${contact.whatsapp.number}?text=${encodeURIComponent(text)}`;
}
