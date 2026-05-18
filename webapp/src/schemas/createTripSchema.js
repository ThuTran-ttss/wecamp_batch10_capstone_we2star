import { z } from "zod";
import {
  CURRENCY_OPTIONS,
  DESCRIPTION_MAX,
  TRIP_NAME_MAX,
} from "@/constants/trips";

const currencyValues = CURRENCY_OPTIONS.map((c) => c.value);

export const createTripSchema = z
  .object({
    tripName: z
      .string()
      .trim()
      .min(1, "Trip name is required")
      .max(TRIP_NAME_MAX, `Trip name must be at most ${TRIP_NAME_MAX} characters`),
    destination: z.string().trim().min(1, "Destination is required"),
    startDate: z.string().min(1, "Start date is required"),
    endDate: z.string().min(1, "End date is required"),
    budget: z.coerce
      .number({ invalid_type_error: "Budget must be a number" })
      .min(0, "Budget cannot be negative"),
    currency: z.enum(currencyValues, {
      errorMap: () => ({ message: "Please select a currency" }),
    }),
    coverImage: z.string().optional(),
    description: z
      .string()
      .max(
        DESCRIPTION_MAX,
        `Description must be at most ${DESCRIPTION_MAX} characters`,
      )
      .optional(),
  })
  .refine(
    (data) => {
      if (!data.startDate || !data.endDate) {
        return true;
      }

      return new Date(data.endDate) >= new Date(data.startDate);
    },
    {
      message: "End date must be on or after start date",
      path: ["endDate"],
    },
  );
