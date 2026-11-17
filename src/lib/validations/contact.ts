import { z } from "zod";

export const contactSchema = z.object({
  name: z.string().trim().min(2, "Please enter your full name").max(80),
  phone: z
    .string()
    .trim()
    .regex(
      /^(\+?91[\s-]?)?[6-9]\d{4}[\s-]?\d{5}$/,
      "Enter a valid 10-digit Indian mobile number"
    ),
  email: z.string().trim().email("Enter a valid email address").max(120),
  subject: z
    .string()
    .trim()
    .max(120, "Subject is too long")
    .optional()
    .or(z.literal("")),
  message: z
    .string()
    .trim()
    .min(10, "Tell us a little more — at least 10 characters")
    .max(2000, "Message is too long"),
  consent: z.literal(true, {
    message: "Please accept to be contacted about your enquiry",
  }),
  company: z.string().max(0).optional(),
  website: z.string().max(0).optional(),
});

export type ContactPayload = z.infer<typeof contactSchema>;
