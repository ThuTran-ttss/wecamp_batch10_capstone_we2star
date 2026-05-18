import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import { FileText, MapPin } from "lucide-react";
import { toast } from "react-toastify";
import { v4 as uuidv4 } from "uuid";
import ActivityInput from "@/components/itinerary/form/ActivityInput";
import FormButton from "@/components/itinerary/form/FormButton";
import {
  CURRENCY_OPTIONS,
  DESCRIPTION_MAX,
  TRIP_NAME_MAX,
} from "@/constants/trips";
import useTripDetails from "@/hooks/useTripDetails";
import { createTripSchema } from "@/schemas/createTripSchema";
import { createEmptyTrip } from "@/utils/tripsUtils";
import { parseCountryFromDestination } from "@/utils/tripFormUtils";
import CharCounter from "./CharCounter";
import FileUploadZone from "./FileUploadZone";
import FormSectionCard from "./FormSectionCard";
import FormSelect from "./form/FormSelect";
import FormTextarea from "./form/FormTextarea";

const defaultValues = {
  tripName: "",
  destination: "",
  startDate: "",
  endDate: "",
  budget: "",
  currency: "USD",
  coverImage: "",
  description: "",
};

function CreateTripForm({ onValuesChange }) {
  const navigate = useNavigate();
  const { upsertTrip, setCurrentTripId } = useTripDetails();

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(createTripSchema),
    mode: "onChange",
    defaultValues,
  });

  const formValues = watch();
  const tripNameLength = formValues.tripName?.length ?? 0;
  const descriptionLength = formValues.description?.length ?? 0;
  const currency = formValues.currency || "USD";

  useEffect(() => {
    onValuesChange?.(formValues);
  }, [
    formValues.tripName,
    formValues.destination,
    formValues.startDate,
    formValues.endDate,
    formValues.budget,
    formValues.currency,
    formValues.coverImage,
    formValues.description,
    onValuesChange,
  ]);

  const onSubmit = (data) => {
    const tripId = uuidv4();
    const country = parseCountryFromDestination(data.destination);

    const trip = createEmptyTrip({
      tripId,
      tripName: data.tripName,
      destination: data.destination,
      country,
      startDate: data.startDate,
      endDate: data.endDate,
      budget: data.budget,
      currency: data.currency,
      coverImage: data.coverImage || "",
      description: data.description || "",
    });

    upsertTrip(trip);
    setCurrentTripId(tripId);
    toast.success("Trip created successfully!");
    navigate("/trips");
  };

  const handleCoverChange = (dataUrl) => {
    setValue("coverImage", dataUrl, { shouldValidate: true });
  };

  return (
    <FormSectionCard title="Trip Information" icon={FileText}>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
        <div>
          <div className="mb-2 flex items-center justify-between">
            <label className="text-sm font-semibold text-gray-700">
              Trip Name <span className="text-red-500">*</span>
            </label>
            <CharCounter current={tripNameLength} max={TRIP_NAME_MAX} />
          </div>
          <ActivityInput
            placeholder="e.g. Ha Noi Discovery"
            error={errors.tripName?.message}
            {...register("tripName")}
          />
        </div>

        <ActivityInput
          label="Destination"
          placeholder="e.g. Hanoi, Vietnam"
          icon={MapPin}
          required
          error={errors.destination?.message}
          {...register("destination")}
        />

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <ActivityInput
            label="Start Date"
            type="date"
            required
            error={errors.startDate?.message}
            {...register("startDate")}
          />
          <ActivityInput
            label="End Date"
            type="date"
            required
            error={errors.endDate?.message}
            {...register("endDate")}
          />
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <ActivityInput
            label={`Initial Budget (${currency})`}
            type="number"
            min="0"
            step="0.01"
            placeholder="0"
            required
            error={errors.budget?.message}
            {...register("budget")}
          />
          <FormSelect
            label="Currency"
            required
            options={CURRENCY_OPTIONS}
            error={errors.currency?.message}
            {...register("currency")}
          />
        </div>

        <FileUploadZone
          value={formValues.coverImage}
          onChange={handleCoverChange}
          onError={(message) => toast.error(message)}
        />

        <div>
          <div className="mb-2 flex items-center justify-between">
            <label className="text-sm font-semibold text-gray-700">
              Description (Optional)
            </label>
            <CharCounter
              current={descriptionLength}
              max={DESCRIPTION_MAX}
            />
          </div>
          <FormTextarea
            placeholder="Tell us about your trip plans..."
            rows={4}
            error={errors.description?.message}
            {...register("description")}
          />
        </div>

        <div className="flex flex-col-reverse gap-3 border-t border-gray-100 pt-6 sm:flex-row sm:justify-end">
          <FormButton
            type="button"
            variant="secondary"
            onClick={() => navigate("/trips")}
            disabled={isSubmitting}
          >
            Cancel
          </FormButton>
          <FormButton type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Creating..." : "Create Trip"}
          </FormButton>
        </div>
      </form>
    </FormSectionCard>
  );
}

export default CreateTripForm;
