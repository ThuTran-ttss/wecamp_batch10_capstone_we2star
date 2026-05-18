import { useState } from "react";
import {
  CreateTripForm,
  InfoAlert,
  TripPreviewCard,
} from "@/components/trips";

const previewDefaults = {
  tripName: "",
  destination: "",
  startDate: "",
  endDate: "",
  budget: "",
  currency: "USD",
  coverImage: "",
  description: "",
};

function CreateTripPage() {
  const [previewValues, setPreviewValues] = useState(previewDefaults);

  return (
    <div className="mx-auto flex w-full max-w-7xl flex-col gap-6">
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-bold text-gray-900 md:text-3xl">
          Create New Trip
        </h1>
        <p className="text-sm text-gray-500 md:text-base">
          Plan your next adventure! Add the basic details of your trip to get
          started.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-5">
        <div className="lg:col-span-3">
          <CreateTripForm onValuesChange={setPreviewValues} />
        </div>
        <div className="lg:col-span-2">
          <TripPreviewCard
            tripName={previewValues.tripName}
            destination={previewValues.destination}
            startDate={previewValues.startDate}
            endDate={previewValues.endDate}
            budget={previewValues.budget}
            currency={previewValues.currency}
            coverImage={previewValues.coverImage}
          />
          <InfoAlert className="mt-4">
            You can edit all details later. Don&apos;t worry, you can update
            everything anytime after creating your trip.
          </InfoAlert>
        </div>
      </div>
    </div>
  );
}

export default CreateTripPage;
