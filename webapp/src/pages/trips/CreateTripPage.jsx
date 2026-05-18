import {
  Breadcrumbs,
  InfoAlert,
  TripPreviewCard,
} from "@/components/trips";

function CreateTripPage() {
  return (
    <div className="mx-auto flex w-full max-w-7xl flex-col gap-6 p-4 md:p-6 lg:p-8">
      <Breadcrumbs
        items={[
          { label: "My Trips", to: "/trips" },
          { label: "Create New Trip" },
        ]}
      />

      <div className="grid gap-6 lg:grid-cols-5">
        <div className="lg:col-span-3">
          <p className="text-gray-500">Form — Phase 4</p>
        </div>
        <div className="lg:col-span-2">
          <TripPreviewCard />
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
