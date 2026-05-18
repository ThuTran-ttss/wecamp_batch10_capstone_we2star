import React, { useEffect, useState } from "react";

import {
  CalendarDays,
  Clock3,
  MapPin,
  BriefcaseBusiness,
  Backpack,
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
import { tripDetails, getInitialTripDetails } from "@/mock_data";
import { STORAGE_KEYS } from "@/constants/trips";
import { toast } from "react-toastify";
import PackingSection from "@/components/itinerary/PackingSection";
import BudgetSection from "@/components/itinerary/BudgetSection";
import { Link, useLocation, useNavigate } from "react-router-dom";
import FormButton from "@/components/itinerary/form/FormButton";
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
      packed: "No",
      required: "No",
    },
    budget: {
      name: "",
      category: "",
      estimatedCost: "",
      actualCost: "",
      paymentStatus: "",
    },
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
  const navigate = useNavigate();

  const location = useLocation();
  const tripId = location.state?.tripId;
  const activityDate = location.state?.date;
  const [selectedPackingItems, setSelectedPackingItems] = useState([]);
  const [selectedBudgets, setSelectedBudgets] = useState([]);
  const [showBudget, setShowBugdet] = useState(false);
  const [showPacking, setShowPacking] = useState(false);
  const selectedPriority = watch("priority");
  const getInitialPackingItems = () => {
    const savedTrips = localStorage.getItem(STORAGE_KEYS.TRIP_DETAILS);

    if (savedTrips) {
      const parsedTrips = JSON.parse(savedTrips);

      return parsedTrips[tripId]?.packingList || [];
    }

    return tripDetails[tripId]?.packingList;
  };
  const getInitialBudgetItems = () => {
    const savedTrips = localStorage.getItem(STORAGE_KEYS.TRIP_DETAILS);

    if (savedTrips) {
      const parsedTrips = JSON.parse(savedTrips);

      return parsedTrips[tripId]?.budgetItems || [];
    }

    return tripDetails[tripId]?.budgetItems;
  };
  const [budgetItems, setBudgetItems] = useState(getInitialBudgetItems);
  const [packingItems, setPackingItems] = useState(getInitialPackingItems);

  const [activities, setActivities] = useState(() => {
    const savedActivities = localStorage.getItem("itinerary");

    return savedActivities
      ? JSON.parse(savedActivities)
      : tripDetails.trip_001.itinerary;
  });

  const onAddActivity = (newActivity) => {
    const updatedActivities = [...activities, newActivity];

    setActivities(updatedActivities);

    localStorage.setItem("itinerary", JSON.stringify(updatedActivities));
  };

  const onSubmit = (data) => {

    if (showPacking && selectedPackingItems.length === 0) {
      toast.warning("Please add at least one packing item.");

      return;
    }

    if (showBudget && selectedBudgets.length === 0) {
      toast.warning("Please add at least one budget item.");

      return;
    }

    const savedTrips =
      JSON.parse(localStorage.getItem(STORAGE_KEYS.TRIP_DETAILS)) ||
      getInitialTripDetails();

    const existingPackingItems = savedTrips[tripId].packingList || [];

    const updatedPackingItems = [...existingPackingItems];

    selectedPackingItems.forEach((newItem) => {
      const existingIndex = updatedPackingItems.findIndex(
        (item) => item.id === newItem.id,
      );

      // update
      if (existingIndex !== -1) {
        updatedPackingItems[existingIndex] = newItem;
      }

      // create
      else {
        updatedPackingItems.push(newItem);
      }
    });

    savedTrips[tripId].packingList = updatedPackingItems;

    // Add budget
    const existingBudgetItems = savedTrips[tripId].budgetItems || [];

    const formattedSelectedBudgets = selectedBudgets.map((item) => ({
      ...item,
      estimatedCost: Number(item.estimatedCost) || 0,
      actualCost: Number(item.actualCost) || 0,
    }));

    const updatedBudgetItems = [...existingBudgetItems];

    formattedSelectedBudgets.forEach((newItem) => {
      const existingIndex = updatedBudgetItems.findIndex(
        (item) => item.id === newItem.id,
      );

      // update
      if (existingIndex !== -1) {
        updatedBudgetItems[existingIndex] = newItem;
      }

      // create
      else {
        updatedBudgetItems.push(newItem);
      }
    });

    savedTrips[tripId].budgetItems = updatedBudgetItems;

    const { budget, packing, ...activityData } = data;
    const newActivity = {
      id: uuidv4(),
      ...activityData,
    };

    savedTrips[tripId].itinerary = [
      ...savedTrips[tripId]?.itinerary,
      newActivity,
    ];

    // save
    localStorage.setItem(
      STORAGE_KEYS.TRIP_DETAILS,
      JSON.stringify(savedTrips),
    );

    toast.success("Activity added successfully!");

    // reset
    reset(initialValue);

    setSelectedPackingItems([]);

    setSelectedBudgets([]);

    setShowBugdet(false);

    setShowPacking(false);

    navigate("/itinerary", {
      state: {
        scrollToId: newActivity.id,
      },
    });
  };
  useEffect(() => {
    if (activityDate) {
      setValue("date", activityDate);
    }
  }, [activityDate, setValue]);
  return (
    <div className="bg-slate-50">
      <div className="mx-auto max-w-6xl rounded-2xl py-6">
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
              readOnly={!!activityDate}
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
            {/* PRIORITY */}
            <label className="mb-3 block text-sm font-semibold text-gray-700">
              Priority Level <span className="text-red-500">*</span>
            </label>

            <input type="hidden" {...register("priority")} />

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
                budgetItems={budgetItems}
                selectedBudgets={selectedBudgets}
                setSelectedBudgets={setSelectedBudgets}
                reset={reset}
                setValue={setValue}
                initialValue={initialValue}
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
                initialValue={initialValue}
              />
            )}
          </div>
          {/* FOOTER */}
          <div className="flex justify-end gap-3 pt-4">
            <Link to="/itinerary">
              <FormButton variant="secondary" className="w-auto px-6 py-2">
                Cancel
              </FormButton>
            </Link>
            <FormButton type="submit" className="w-auto px-6 py-2">
              Save Activity
            </FormButton>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddActivity;
