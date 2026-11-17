import { z } from "zod";

/**
 * Enquiry validation — shared between the client form and the API route.
 * Phone accepts Indian formats with optional +91 prefix and separators.
 */
export const enquirySchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Please enter your full name")
    .max(80, "Name is too long"),
  phone: z
    .string()
    .trim()
    .regex(
      /^(\+?91[\s-]?)?[6-9]\d{4}[\s-]?\d{5}$/,
      "Enter a valid 10-digit Indian mobile number"
    ),
  email: z
    .string()
    .trim()
    .email("Enter a valid email address")
    .max(120, "Email is too long"),
  propertyType: z.string().trim().min(1, "Select what you're looking for"),
  location: z.string().trim().min(1, "Select a preferred location"),
  budget: z.string().trim().min(1, "Select a budget range"),
  message: z
    .string()
    .trim()
    .max(2000, "Message is too long")
    .optional()
    .or(z.literal("")),
  consent: z.literal(true, {
    message: "Please accept to be contacted about your enquiry",
  }),
  // Spam protection — hidden fields; bots fill these, humans don't.
  company: z.string().max(0).optional(),
  website: z.string().max(0).optional(),
});

export type EnquiryPayload = z.infer<typeof enquirySchema>;

export const propertyTypeOptions = [
  { value: "house-villa", label: "House / Villa" },
  { value: "apartment", label: "Apartment / Flat" },
  { value: "land-plot", label: "Land / Plot" },
  { value: "commercial", label: "Commercial Space" },
  { value: "not-sure", label: "Not sure yet" },
];

export const budgetOptions = [
  { value: "under-50l", label: "Under ₹50 Lakh" },
  { value: "50l-1cr", label: "₹50 Lakh – ₹1 Crore" },
  { value: "1cr-2cr", label: "₹1 – 2 Crore" },
  { value: "2cr-plus", label: "₹2 Crore+" },
  { value: "discuss", label: "Prefer to discuss" },
];
