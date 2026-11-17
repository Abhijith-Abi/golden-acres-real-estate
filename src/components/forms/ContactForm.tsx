"use client";

import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
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
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import {
  contactSchema,
  type ContactPayload,
} from "@/lib/validations/contact";
import { submitForm } from "@/lib/forms/submit";

/** Contact form — RHF + Zod, honeypot spam trap, honest delivery. */
export function ContactForm() {
  const [submitting, setSubmitting] = useState(false);
  const startedAt = useRef<number | null>(null);

  // Record when the visitor first sees the form (spam bot-check baseline).
  useEffect(() => {
    startedAt.current = Date.now();
  }, []);

  const form = useForm<ContactPayload>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      phone: "",
      email: "",
      subject: "",
      message: "",
      consent: false as unknown as true,
    },
    mode: "onBlur",
  });

  const onSubmit = async (values: ContactPayload) => {
    if (startedAt.current == null || Date.now() - startedAt.current < 2500) {
      toast.error("Please take a moment to complete the form.");
      return;
    }
    setSubmitting(true);
    const result = await submitForm(values, { kind: "contact" });
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
          void form.handleSubmit(onSubmit)(e);
        }}
        noValidate
        className="space-y-5"
      >
        <div aria-hidden className="hidden">
          <label htmlFor="chp-company">Company</label>
          <input id="chp-company" tabIndex={-1} autoComplete="off" {...form.register("company")} />
          <label htmlFor="chp-website">Website</label>
          <input id="chp-website" tabIndex={-1} autoComplete="off" {...form.register("website")} />
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
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
                  <Input type="tel" inputMode="tel" placeholder="+91 98XXX XXXXX" autoComplete="tel" {...field} />
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
                <Input type="email" inputMode="email" placeholder="you@example.com" autoComplete="email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="subject"
          render={({ field }) => (
            <FormItem>
              <FormLabel className={fieldLabel}>Subject (optional)</FormLabel>
              <FormControl>
                <Input placeholder="e.g. Looking for a 3 BHK near Kazhakootam" {...field} value={field.value ?? ""} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormLabel className={fieldLabel}>Message</FormLabel>
              <FormControl>
                <Textarea
                  rows={5}
                  placeholder="Tell us how we can help…"
                  className="resize-none"
                  {...field}
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
            <span className="inline-flex items-center gap-2">
              <Loader2 className="size-4 animate-spin" />
              Sending…
            </span>
          ) : (
            "Send Message"
          )}
        </Button>
      </form>
    </Form>
  );
}
