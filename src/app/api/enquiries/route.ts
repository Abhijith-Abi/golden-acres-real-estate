import { NextResponse } from "next/server";
import { enquirySchema } from "@/lib/validations/enquiry";
import { contactSchema as contactSchemaV } from "@/lib/validations/contact";

/**
 * POST /api/enquiries
 *
 * Server-side lead delivery. Behaviour:
 *  - Validates with the same Zod schemas the client uses.
 *  - Rejects honeypot submissions (bots filling `company`/`website`).
 *  - If ENQUIRY_WEBHOOK_URL is set, forwards the lead (e.g. to a Google
 *    Chat/Zapier/Make/n8n webhook, CRM endpoint or email service).
 *  - If not configured, returns 501 with an explicit "not configured"
 *    response so the UI can hand off to WhatsApp instead of pretending
 *    the enquiry was stored.
 */
export async function POST(request: Request) {
  const webhookUrl = process.env.ENQUIRY_WEBHOOK_URL;
  if (!webhookUrl) {
    return NextResponse.json(
      {
        ok: false,
        message:
          "Enquiry delivery is not configured. No data was stored — please use WhatsApp or call us.",
      },
      { status: 501 }
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { ok: false, message: "Invalid request body." },
      { status: 400 }
    );
  }

  // Honeypot — real users never fill these hidden fields.
  const { company, website, ...rest } = (body ?? {}) as Record<string, unknown>;
  if (
    (typeof company === "string" && company.length > 0) ||
    (typeof website === "string" && website.length > 0)
  ) {
    // Pretend success to the bot; the lead is discarded.
    return NextResponse.json({ ok: true, message: "Enquiry received." });
  }

  const kind = rest.kind === "contact" ? "contact" : "enquiry";
  const parsed =
    kind === "enquiry"
      ? enquirySchema.safeParse(rest)
      : contactSchemaV.safeParse(rest);

  if (!parsed.success) {
    return NextResponse.json(
      {
        ok: false,
        message: "Please check the highlighted fields and try again.",
        issues: parsed.error.flatten().fieldErrors,
      },
      { status: 422 }
    );
  }

  const lead = {
    ...parsed.data,
    kind,
    receivedAt: new Date().toISOString(),
    source: "golden-acres-website",
  };

  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 8000);
    const res = await fetch(webhookUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // Optional shared secret, if the receiving endpoint requires one.
        ...(process.env.ENQUIRY_WEBHOOK_TOKEN
          ? { Authorization: `Bearer ${process.env.ENQUIRY_WEBHOOK_TOKEN}` }
          : {}),
      },
      body: JSON.stringify(lead),
      signal: controller.signal,
    });
    clearTimeout(timeout);

    if (!res.ok) {
      return NextResponse.json(
        {
          ok: false,
          message: "We couldn't record your enquiry just now — please use WhatsApp or call us.",
        },
        { status: 502 }
      );
    }
  } catch {
    return NextResponse.json(
      {
        ok: false,
        message: "We couldn't record your enquiry just now — please use WhatsApp or call us.",
      },
      { status: 502 }
    );
  }

  return NextResponse.json({
    ok: true,
    message: "Enquiry received — we'll be in touch shortly.",
  });
}
