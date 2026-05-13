import React, { useState } from "react";

import {
  CalendarDays,
  Clock3,
  MapPin,
  ChevronDown,
  Trash2,
  Plus,
  BriefcaseBusiness,
  Backpack,
  Pencil,
} from "lucide-react";
import ActivityInput from "@/components/itinerary/form/ActivityInput";
import ActivityToggleCard from "@/components/itinerary/form/ActivityToggleCard";
import ActivitySelect from "@/components/itinerary/form/ActivitySelect";
import { activityCategories, activityStatuses } from "@/constants/itinerary";
import { useForm } from "react-hook-form";

const AddActivity = () => {
  const [showBudget, setShowBugdet] = useState(false);
  const [showPacking, setShowPacking] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: "",
      location: "",
      date: "",
      time: "",
      category: "",
      status: "",
    },
  });
  const onSubmit = (data) => {
    console.log(data);
  };
  const handleToggle = () => {};
  return (
    <div className="shadow">
      <div className="mx-auto rounded-2xl bg-white px-10 py-6">
        {/* HEADER */}
        <div className="mb-8 flex items-start justify-between">
          <div>
            <h1 className="text-3xl font-bold text-[#1f2937]">
              Add New Activity
            </h1>

            <p className="mt-2 text-sm text-gray-500">
              Fill in the details to add this to your itinerary.
            </p>
          </div>
        </div>

        {/* FORM */}
        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
          {/* TITLE */}
          <ActivityInput
            label="Activity Title"
            placeholder="e.g. Dinner at Old Quarter"
            icon={MapPin}
            error={errors.title?.message}
            required
            {...register("title", { required: "Title is required" })}
          />
          {/* LOCATION */}

          <ActivityInput
            label="Location"
            placeholder="Enter a landmark or address"
            icon={MapPin}
            error={errors.location?.message}
            required
            {...register("location", { required: "Location is required" })}
          />
          {/* DATE + TIME */}
          <div className="grid grid-cols-1 gap-10 md:grid-cols-2">
            {/* DATE */}
            <ActivityInput
              label="Date"
              type="date"
              icon={CalendarDays}
              required
              error={errors.date?.message}
              {...register("date", {
                required: "Date is required",
              })}
            />

            {/* TIME */}
            <ActivityInput
              label="Time (24h)"
              type="time"
              icon={Clock3}
              required
              error={errors.time?.message}
              {...register("time", {
                required: "Time is required",
              })}
            />
          </div>

          {/* CATEGORY + STATUS */}
          <div className="grid grid-cols-1 gap-10 md:grid-cols-2">
            {/* CATEGORY */}

            <ActivitySelect
              label="Category"
              options={activityCategories}
              required
              error={errors.category?.message}
              {...register("category", { required: "Category is required" })}
            />
            {/* STATUS */}
            <ActivitySelect
              label="Status"
              options={activityStatuses}
              required
              error={errors.status?.message}
              {...register("status", { required: "Status is required" })}
            />
          </div>
          {/* PRIORITY */}
          <div>
            <label className="mb-3 block text-sm font-semibold text-gray-700">
              Priority Level <span className="text-red-500">*</span>
            </label>

            <div className="grid grid-cols-3 gap-3">
              <button
                type="button"
                className="cursor-pointer rounded-xl bg-gray-100 py-2 text-sm font-medium text-gray-500"
              >
                Low
              </button>

              <button
                type="button"
                className="rounded-xl border border-blue-500 bg-white py-2 text-sm font-semibold text-blue-500"
              >
                Medium
              </button>

              <button
                type="button"
                className="rounded-xl bg-gray-100 py-2 text-sm font-medium text-gray-500"
              >
                High
              </button>
            </div>
          </div>
          {/* TOGGLE SECTIONS */}
          <div className="space-y-4">
            {/* BUDGET */}
            <ActivityToggleCard
              title={" Add Budget"}
              description={"Track expenses and stay on budget."}
              onToggle={handleToggle}
              color="green"
              enabled={showBudget}
              icon={BriefcaseBusiness}
            />

            {/* PACKING */}
            <ActivityToggleCard
              icon={Backpack}
              title="Add Packing Items"
              description="Select or add items you need to pack."
              color="purple"
              enabled={showPacking}
              onToggle={() => setShowPacking(!showPacking)}
            />
          </div>
          {/* FOOTER */}
          <div className="flex justify-end gap-3 pt-4">
            <button className="rounded-xl border px-6 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-50">
              Cancel
            </button>

            <button
              type="submit"
              className="rounded-xl bg-blue-600 px-6 py-2 text-sm font-semibold text-white hover:bg-blue-700"
            >
              Save Activity
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddActivity;
