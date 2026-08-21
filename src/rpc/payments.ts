import { createServerFn } from "@tanstack/react-start";
import { db } from "@/db/client";
import { payments, schedules } from "@/db/schema";

function normalizeKenyanPhone(raw: string): string | null {
  const digits = raw.replace(/\D/g, "");
  if (digits.startsWith("254") && digits.length === 12) return digits;
  if (digits.startsWith("0") && digits.length === 10) return `254${digits.slice(1)}`;
  if (digits.startsWith("7") && digits.length === 9) return `254${digits}`;
  return null;
}

export interface MpesaPaymentInput {
  amount: number;
  phone: string;
  context: string;
}

/** Makes the actual M-Pesa STK push request server-side (avoids exposing the
 * payment endpoint to the browser and lets us record the result reliably),
 * then persists the payment to the database. */
export const makeMpesaPaymentFn = createServerFn({ method: "POST" })
  .validator((input: MpesaPaymentInput) => input)
  .handler(async ({ data }) => {
    if (data.amount < 100) {
      return { error: "Minimum payment amount is KSh 100." as const };
    }
    const normalizedPhone = normalizeKenyanPhone(data.phone);
    if (!normalizedPhone) {
      return { error: "Enter a valid Safaricom number, e.g. 07XXXXXXXX or 2547XXXXXXXX." as const };
    }

    try {
      const formData = new FormData();
      formData.append("amount", String(data.amount));
      formData.append("phone", normalizedPhone);

      const response = await fetch("https://matthiashiggs.alwaysdata.net/api/mpesa_payment", {
        method: "POST",
        body: formData,
      });
      const result = (await response.json().catch(() => ({}))) as {
        message?: string;
        reference?: string;
        CheckoutRequestID?: string;
      };
      const reference =
        result.reference || result.CheckoutRequestID || `MPESA-${Date.now().toString().slice(-6)}`;

      db.insert(payments)
        .values({
          id: `pay-${Date.now()}`,
          context: data.context || "Lifeline service fee",
          amount: data.amount,
          phone: normalizedPhone,
          reference,
          status: "Pending confirmation",
          createdAt: new Date().toISOString(),
        })
        .run();

      return {
        success: true as const,
        message: result.message || "M-Pesa payment request sent. Check your phone to complete it.",
        reference,
      };
    } catch {
      return { error: "Something went wrong reaching M-Pesa. Please try again." as const };
    }
  });

export interface RecordScheduleInput {
  context: string;
  center: string;
  date: string;
  time: string;
  amount: number;
}

export const recordScheduleFn = createServerFn({ method: "POST" })
  .validator((input: RecordScheduleInput) => input)
  .handler(async ({ data }) => {
    db.insert(schedules)
      .values({
        id: `sched-${Date.now()}`,
        context: data.context,
        center: data.center,
        date: data.date,
        time: data.time,
        amount: data.amount,
        createdAt: new Date().toISOString(),
      })
      .run();
    return { ok: true as const };
  });
