"use client";

import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import {
  enquirySchema,
  propertyTypeOptions,
  budgetOptions,
  type EnquiryPayload,
} from "@/lib/validations/enquiry";
import { submitForm, type SubmissionContext } from "@/lib/forms/submit";
import { brand } from "@/config/brand";

/** Premium enquiry form — RHF + Zod, honeypot spam trap, honest delivery. */
export function EnquiryForm({
  context,
  defaultPropertyType,
  defaultLocation,
  compact = false,
}: {
  context: SubmissionContext;
  defaultPropertyType?: string;
  defaultLocation?: string;
  compact?: boolean;
}) {
  const [submitting, setSubmitting] = useState(false);
  const startedAt = useRef<number | null>(null);

  // Record when the visitor first sees the form (spam bot-check baseline).
  useEffect(() => {
    startedAt.current = Date.now();
  }, []);

  const form = useForm<EnquiryPayload>({
    resolver: zodResolver(enquirySchema),
    defaultValues: {
      name: "",
      phone: "",
      email: "",
      propertyType: defaultPropertyType ?? "",
      location: defaultLocation ?? "",
      budget: "",
      message: "",
      consent: false as unknown as true,
    },
    mode: "onBlur",
  });

  const onSubmit = async (values: EnquiryPayload) => {
    // Fill-time spam check — humans need at least ~2.5s.
    if (startedAt.current == null || Date.now() - startedAt.current < 2500) {
      toast.error("Please take a moment to complete the form.");
      return;
    }
    setSubmitting(true);
    const result = await submitForm(values, context);
    setSubmitting(false);

    if (result.status === "success") {
      toast.success(result.message);
      form.reset();
      startedAt.current = Date.now();
    } else if (result.status === "whatsapp") {
      toast.info(result.message);
      window.open(result.url, "_blank", "noopener,noreferrer");
    } else {
      toast.error(result.message);
    }
  };

  const fieldLabel = "text-[11px] font-semibold uppercase tracking-[0.18em] text-charcoal/70";

  return (
    <Form {...form}>
      <form
        onSubmit={(e) => {
          // handleSubmit is invoked at event time, never during render.
          void form.handleSubmit(onSubmit)(e);
        }}
        noValidate
        className="space-y-5"
      >
        {/* Honeypots — hidden from humans */}
        <div aria-hidden className="hidden">
          <label htmlFor="hp-company">Company</label>
          <input id="hp-company" tabIndex={-1} autoComplete="off" {...form.register("company")} />
          <label htmlFor="hp-website">Website</label>
          <input id="hp-website" tabIndex={-1} autoComplete="off" {...form.register("website")} />
        </div>

        <div className={`grid gap-5 ${compact ? "" : "sm:grid-cols-2"}`}>
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className={fieldLabel}>Full name</FormLabel>
                <FormControl>
                  <Input placeholder="Your name" autoComplete="name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel className={fieldLabel}>Phone</FormLabel>
                <FormControl>
                  <Input
                    type="tel"
                    inputMode="tel"
                    placeholder="+91 98XXX XXXXX"
                    autoComplete="tel"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel className={fieldLabel}>Email</FormLabel>
              <FormControl>
                <Input
                  type="email"
                  inputMode="email"
                  placeholder="you@example.com"
                  autoComplete="email"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className={`grid gap-5 ${compact ? "" : "sm:grid-cols-2"}`}>
          <FormField
            control={form.control}
            name="propertyType"
            render={({ field }) => (
              <FormItem>
                <FormLabel className={fieldLabel}>Interested in</FormLabel>
                <Select
                  value={field.value}
                  onValueChange={(v) => field.onChange(v)}
                >
                  <FormControl>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Property type" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {propertyTypeOptions.map((o) => (
                      <SelectItem key={o.value} value={o.value}>
                        {o.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="budget"
            render={({ field }) => (
              <FormItem>
                <FormLabel className={fieldLabel}>Budget range</FormLabel>
                <Select value={field.value} onValueChange={(v) => field.onChange(v)}>
                  <FormControl>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select budget" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {budgetOptions.map((o) => (
                      <SelectItem key={o.value} value={o.value}>
                        {o.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="location"
          render={({ field }) => (
            <FormItem>
              <FormLabel className={fieldLabel}>Preferred location</FormLabel>
              <Select value={field.value} onValueChange={(v) => field.onChange(v)}>
                <FormControl>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Preferred area in Trivandrum" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {brand.serviceAreas.map((area) => (
                    <SelectItem key={area} value={area}>
                      {area}
                    </SelectItem>
                  ))}
                  <SelectItem value="anywhere">Anywhere in Trivandrum</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormLabel className={fieldLabel}>Message (optional)</FormLabel>
              <FormControl>
                <Textarea
                  rows={compact ? 3 : 4}
                  placeholder="Tell us what you're looking for…"
                  className="resize-none"
                  {...field}
                  value={field.value ?? ""}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="consent"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start gap-3">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={(v) => field.onChange(v === true)}
                />
              </FormControl>
              <FormDescription className="text-[13px] leading-relaxed text-muted-foreground">
                I agree to be contacted by Golden Acres Real Estates by phone,
                WhatsApp or email regarding my enquiry.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          type="submit"
          disabled={submitting}
          className="h-13 w-full bg-charcoal text-[12px] font-medium uppercase tracking-[0.18em] text-ivory hover:bg-charcoal-soft sm:w-auto sm:px-10"
        >
          {submitting ? (
            <motion.span className="inline-flex items-center gap-2">
              <Loader2 className="size-4 animate-spin" />
              Sending…
            </motion.span>
          ) : (
            "Send Enquiry"
          )}
        </Button>
      </form>
    </Form>
  );
}
