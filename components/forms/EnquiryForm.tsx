"use client";

import { useState, type FormEvent } from "react";
import { Send } from "lucide-react";
import { site } from "@/data/site";
import { cn } from "@/lib/utils";
import { WhatsAppIcon } from "@/components/ui/icons";

/**
 * Enquiry form.
 *
 * There is no backend on this project yet, so the form does not pretend to send
 * anything. It composes the enquiry and hands it to WhatsApp with the details
 * pre-filled — which is also the primary conversion route for this business.
 *
 * TO CONNECT A BACKEND
 * Set NEXT_PUBLIC_ENQUIRY_ENDPOINT to a URL that accepts a JSON POST. The form
 * will submit to it and report a real success or failure instead of handing off
 * to WhatsApp. Nothing else needs to change.
 */
const ENDPOINT = process.env.NEXT_PUBLIC_ENQUIRY_ENDPOINT;

const SERVICE_OPTIONS = [
  "Performance Training",
  "Strength & Conditioning",
  "Athlete Development",
  "Performance Testing",
  "Sports Physiotherapy",
  "Sports Rehabilitation",
  "Online / Distance Coaching",
  "General Enquiry",
];

const CONTACT_METHODS = ["WhatsApp", "Phone call"];

type Status = "idle" | "sending" | "sent" | "error";

const initialState = {
  name: "",
  phone: "",
  whatsapp: "",
  age: "",
  sport: "",
  service: "",
  goal: "",
  contactMethod: CONTACT_METHODS[0],
  message: "",
};

export function EnquiryForm({ defaultService }: { defaultService?: string }) {
  const [values, setValues] = useState({
    ...initialState,
    service: defaultService ?? "",
  });
  const [status, setStatus] = useState<Status>("idle");

  const set = (key: keyof typeof initialState) => (value: string) =>
    setValues((prev) => ({ ...prev, [key]: value }));

  const composeMessage = () =>
    [
      "New enquiry — Kinetic Edge",
      "",
      `Name: ${values.name}`,
      `Phone: ${values.phone}`,
      values.whatsapp ? `WhatsApp: ${values.whatsapp}` : null,
      values.age ? `Age: ${values.age}` : null,
      values.sport ? `Sport / Activity: ${values.sport}` : null,
      values.service ? `Service: ${values.service}` : null,
      `Preferred contact: ${values.contactMethod}`,
      values.goal ? `Goal / concern: ${values.goal}` : null,
      values.message ? `Message: ${values.message}` : null,
    ]
      .filter(Boolean)
      .join("\n");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!ENDPOINT) {
      // Hand off to WhatsApp with the enquiry pre-filled.
      const url = `${site.whatsapp.href}?text=${encodeURIComponent(composeMessage())}`;
      window.open(url, "_blank", "noopener,noreferrer");
      return;
    }

    setStatus("sending");
    try {
      const response = await fetch(ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      if (!response.ok) throw new Error(String(response.status));
      setStatus("sent");
      setValues(initialState);
    } catch {
      setStatus("error");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="grid gap-5" noValidate={false}>
      <div className="grid gap-5 sm:grid-cols-2">
        <Field
          id="name"
          label="Name"
          required
          value={values.name}
          onChange={set("name")}
          autoComplete="name"
        />
        <Field
          id="phone"
          label="Phone number"
          type="tel"
          required
          value={values.phone}
          onChange={set("phone")}
          autoComplete="tel"
          inputMode="tel"
        />
        <Field
          id="whatsapp"
          label="WhatsApp number"
          hint="If different from your phone number"
          type="tel"
          value={values.whatsapp}
          onChange={set("whatsapp")}
          inputMode="tel"
        />
        <Field
          id="age"
          label="Age"
          type="number"
          value={values.age}
          onChange={set("age")}
          inputMode="numeric"
        />
        <Field
          id="sport"
          label="Sport / activity"
          value={values.sport}
          onChange={set("sport")}
        />

        <div className="group grid gap-2">
          <label
            htmlFor="service"
            className="ke-label text-steel transition-colors group-focus-within:text-accent-ink"
          >
            Service interested in
          </label>
          <select
            id="service"
            name="service"
            value={values.service}
            onChange={(event) => set("service")(event.target.value)}
            className={fieldClasses}
          >
            <option value="">Select a service</option>
            {SERVICE_OPTIONS.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
      </div>

      <Field
        id="goal"
        label="Current goal or concern"
        value={values.goal}
        onChange={set("goal")}
      />

      <fieldset className="grid gap-3">
        <legend className="ke-label mb-1 text-steel">
          Preferred contact method
        </legend>
        <div className="flex flex-wrap gap-2">
          {CONTACT_METHODS.map((method) => {
            const active = values.contactMethod === method;
            return (
              <label
                key={method}
                /* The radio itself is sr-only, so the focus ring has to be
                   carried by the label the visitor can actually see. */
                className={cn(
                  "cursor-pointer rounded-[2px] border px-4 py-2.5 text-[0.875rem] transition-colors",
                  "has-[:focus-visible]:outline has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-[var(--accent)]",
                  active
                    ? "border-ink bg-ink text-white"
                    : "border-line text-steel hover:border-ink/40 hover:text-ink",
                )}
              >
                <input
                  type="radio"
                  name="contactMethod"
                  value={method}
                  checked={active}
                  onChange={() => set("contactMethod")(method)}
                  className="sr-only"
                />
                {method}
              </label>
            );
          })}
        </div>
      </fieldset>

      <div className="group grid gap-2">
        <label
          htmlFor="message"
          className="ke-label text-steel transition-colors group-focus-within:text-accent-ink"
        >
          Message
        </label>
        <textarea
          id="message"
          name="message"
          rows={4}
          value={values.message}
          onChange={(event) => set("message")(event.target.value)}
          className={cn(fieldClasses, "resize-y py-3")}
        />
      </div>

      <div className="mt-2 flex flex-col gap-4">
        <button
          type="submit"
          disabled={status === "sending"}
          className="group inline-flex h-14 items-center justify-center gap-2.5 rounded-[2px] bg-accent-ink px-8 font-display text-base font-semibold text-white transition-colors hover:bg-accent-ink-hover disabled:opacity-60"
        >
          {ENDPOINT ? (
            <Send className="h-4 w-4" aria-hidden="true" />
          ) : (
            <WhatsAppIcon className="h-4 w-4" />
          )}
          {status === "sending" ? "Sending…" : "Send Enquiry"}
        </button>

        <p className="text-[0.8125rem] leading-relaxed text-steel">
          {ENDPOINT
            ? "Your enquiry is sent to the Kinetic Edge team, who will get back to you by your preferred contact method."
            : "This opens WhatsApp with your details filled in, ready to send to Kinetic Edge. Nothing is submitted until you send it there."}
        </p>

        <p aria-live="polite" className="sr-only">
          {status === "sent" ? "Enquiry sent." : ""}
          {status === "error" ? "Enquiry could not be sent." : ""}
        </p>

        {status === "sent" ? (
          <p className="border border-ke-teal-100 bg-ke-teal-50 px-4 py-3 text-[0.875rem] text-ke-teal-700">
            Thank you — your enquiry has been received.
          </p>
        ) : null}

        {status === "error" ? (
          <p className="border border-line bg-bone px-4 py-3 text-[0.875rem] text-ink">
            That did not go through. Please call or WhatsApp{" "}
            <a
              href={site.whatsapp.href}
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium underline underline-offset-4"
            >
              {site.phone.display}
            </a>{" "}
            instead.
          </p>
        ) : null}
      </div>
    </form>
  );
}

const fieldClasses =
  "h-12 w-full rounded-[2px] border border-line bg-paper px-3.5 ke-body text-ink transition-colors placeholder:text-steel hover:border-ink/30 focus:border-accent focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]";

function Field({
  id,
  label,
  hint,
  type = "text",
  required,
  value,
  onChange,
  autoComplete,
  inputMode,
}: {
  id: string;
  label: string;
  hint?: string;
  type?: string;
  required?: boolean;
  value: string;
  onChange: (value: string) => void;
  autoComplete?: string;
  inputMode?: "tel" | "numeric" | "text";
}) {
  const hintId = hint ? `${id}-hint` : undefined;

  return (
    <div className="group grid gap-2">
      <label
        htmlFor={id}
        className="ke-label text-steel transition-colors group-focus-within:text-accent-ink"
      >
        {label}
        {required ? (
          <span aria-hidden="true" className="ml-1 text-accent-ink">
            *
          </span>
        ) : null}
      </label>

      <input
        id={id}
        name={id}
        type={type}
        required={required}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        autoComplete={autoComplete}
        inputMode={inputMode}
        aria-describedby={hintId}
        className={fieldClasses}
      />

      {hint ? (
        <p id={hintId} className="text-[0.75rem] text-steel">
          {hint}
        </p>
      ) : null}
    </div>
  );
}
