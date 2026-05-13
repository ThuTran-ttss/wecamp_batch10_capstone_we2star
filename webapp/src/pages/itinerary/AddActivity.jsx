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
  Captions,
} from "lucide-react";
import ActivityInput from "@/components/itinerary/form/ActivityInput";
import ActivityToggleCard from "@/components/itinerary/form/ActivityToggleCard";
import ActivitySelect from "@/components/itinerary/form/ActivitySelect";
import {
  activityCategories,
  activityStatuses,
  priorityLevels,
} from "@/constants/itinerary";
import { useForm } from "react-hook-form";
import { v4 as uuidv4 } from "uuid";
import { tripDetails } from "@/mock_data";
import { toast } from "react-toastify";
import PackingSection from "@/components/itinerary/PackingSection";
import BudgetSection from "@/components/itinerary/BudgetSection";
const AddActivity = () => {
  const initialValue = {
    title: "",
    location: "",
    date: "",
    time: "",
    category: "",
    status: "",
    priority: "Medium",

    packing: {
      itemName: "",
      category: "",
      packed: "false",
      required: "true",
    },
    bugdet: {},
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
    trigger,
    reset,
    getValues,
    clearErrors,
  } = useForm({
    mode: "onChange",
    defaultValues: initialValue,
  });
  const [activities, setActivities] = useState(() => {
    const savedActivities = localStorage.getItem("itinerary");

    return savedActivities
      ? JSON.parse(savedActivities)
      : tripDetails.trip_001.itinerary;
  });
  const [selectedPackingItems, setSelectedPackingItems] = useState([]);
  const getInitialPackingItems = () => {
    const savedPackingList = localStorage.getItem("packingList");

    if (savedPackingList) {
      return JSON.parse(savedPackingList);
    }

    return tripDetails.trip_001.packingList;
  };

  const [packingItems, setPackingItems] = useState(getInitialPackingItems);
  const onAddActivity = (newActivity) => {
    const updatedActivities = [...activities, newActivity];

    setActivities(updatedActivities);

    localStorage.setItem("itinerary", JSON.stringify(updatedActivities));
  };
  const [budgets, setBudgets] = useState([]);
  const [showBudget, setShowBugdet] = useState(false);
  const [showPacking, setShowPacking] = useState(false);
  const selectedPriority = watch("priority");

  const onSubmit = (data) => {
    if (showPacking && selectedPackingItems.length === 0) {
      toast.warning("Please add at least one packing item.");
      return;
    }
    if (showBudget && budgets.length === 0) {
      toast.warning("Please add at least one budget item.");
      return;
    }
    if (selectedPackingItems.length > 0) {
      const updatedPackingList = [...packingItems, ...selectedPackingItems];
      localStorage.setItem("packingList", JSON.stringify(updatedPackingList));
    }
    const newActivity = {
      id: uuidv4(),
      ...data,
    };

    onAddActivity(newActivity);

    console.log(newActivity);
    toast.success("Activity added successfully!");
    reset(initialValue);
    setSelectedPackingItems([]);
    setShowBugdet(false);
    setShowPacking(false);
  };

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
            icon={Captions}
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
              {priorityLevels.map((priority) => {
                const isActive = selectedPriority === priority;

                return (
                  <button
                    key={priority}
                    type="button"
                    onClick={() => setValue("priority", priority)}
                    className={`rounded-xl py-2 text-sm transition ${
                      isActive
                        ? "cursor-pointer border border-blue-500 bg-white font-semibold text-blue-500"
                        : "cursor-pointer bg-gray-100 font-medium text-gray-500"
                    }`}
                  >
                    {priority}
                  </button>
                );
              })}
            </div>
          </div>
          {/* TOGGLE SECTIONS */}
          <div className="space-y-4">
            {/* BUDGET */}
            <ActivityToggleCard
              title={" Add Budget"}
              description={"Track expenses and stay on budget."}
              onToggle={() => setShowBugdet(!showBudget)}
              color="green"
              enabled={showBudget}
              icon={BriefcaseBusiness}
            />
            {showBudget && (
              <BudgetSection
                register={register}
                errors={errors}
                trigger={trigger}
                getValues={getValues}
                budgets={budgets}
                setBudgets={setBudgets}
              />
            )}{" "}
            {/* PACKING */}
            <ActivityToggleCard
              icon={Backpack}
              title="Add Packing Items"
              description="Select or add items you need to pack."
              color="purple"
              enabled={showPacking}
              onToggle={() => setShowPacking(!showPacking)}
            />
            {showPacking && (
              <PackingSection
                register={register}
                watch={watch}
                setValue={setValue}
                reset={reset}
                errors={errors}
                selectedPackingItems={selectedPackingItems}
                setSelectedPackingItems={setSelectedPackingItems}
                trigger={trigger}
                getValues={getValues}
                clearErrors={clearErrors}
                packingItems={packingItems}
              />
            )}
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
