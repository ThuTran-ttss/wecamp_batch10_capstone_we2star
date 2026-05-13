import React, { useState } from "react";

import {
  Plus,
  Minus,
  ChevronDown,
  Package,
  Pencil,
  Trash2,
} from "lucide-react";

import { tripDetails } from "@/mock_data";
import PackingItem from "./PackingItem";
import ActivityInput from "./form/ActivityInput";
import ActivitySelect from "./form/ActivitySelect";
import RadioButton from "./form/RadioButton";
import { packingCategories } from "@/constants/packing";

const PackingSection = ({
  register,
  watch,
  setValue,
  reset,
  errors,
  selectedPackingItems,
  setSelectedPackingItems,
  trigger,
  getValues,
  clearErrors,
  packingItems,
}) => {
  const [itemName, setItemName] = useState("");
  const [quantity, setQuantity] = useState(1);

  const [showForm, setShowForm] = useState(false);

  const [isEditing, setIsEditing] = useState(false);

  const existingItem = packingItems?.find(
    (item) => item?.name?.toLowerCase() === itemName.toLowerCase(),
  );
  const handleAddPackingItem = (data) => {
    const newItem = {
      id: Date.now(),
      ...data.packing,
      quantity,
    };

    console.log(newItem);

    setSelectedPackingItems((prev) => [...prev, newItem]);

    reset({
      ...data,
      packing: {
        itemName: "",
        category: "",
        packed: "false",
        required: "true",
      },
    });
    setQuantity(1);
    console.log(newItem);
    return newItem;
  };
  const handleValidatePacking = async () => {
    const packingData = getValues("packing");

    const isEmpty = !packingData.itemName && !packingData.category;

    if (isEmpty && selectedPackingItems.length > 0) {
      clearErrors("packing");

      return true;
    }

    if (isEmpty && selectedPackingItems.length === 0) {
      toast.warning("Please add at least one packing item.");

      return false;
    }

    const isValid = await trigger(["packing.itemName", "packing.category"]);

    if (!isValid) return false;

    handleAddPackingItem({
      packing: packingData,
    });

    return true;
  };

  const handleDeletePackingItem = (itemName) => {
    setSelectedPackingItems((prev) =>
      prev.filter((item) => item.itemName !== itemName),
    );
  };

  const handleEditPackingItem = (itemName) => {
    const selectedItem = selectedPackingItems.find(
      (item) => item.itemName === itemName,
    );

    if (!selectedItem) return;

    // SHOW FORM
    setShowForm(true);

    setIsEditing(true);

    // SET VALUES
    setValue("packing.itemName", selectedItem.itemName);

    setValue("packing.category", selectedItem.category);

    setValue("packing.packed", String(selectedItem.packed));

    setValue("packing.required", String(selectedItem.required));

    setQuantity(selectedItem.quantity);

    setSelectedPackingItems((prev) =>
      prev.filter((item) => item.itemName !== itemName),
    );
  };

  return (
    <div className="overflow-hidden rounded-2xl border border-gray-300 bg-white transition-all duration-300">
      <div className="grid grid-cols-1 lg:grid-cols-[1.6fr_1fr]">
        {/* LEFT */}
        <div className="border-r border-gray-300">
          <div className="space-y-6 p-6">
            {/* ITEM NAME */}
            <div>
              <ActivityInput
                label="Item name"
                placeholder="Travel Adapter"
                required
                error={errors.packing?.itemName?.message}
                {...register("packing.itemName", {
                  required: showForm ? "Packing name is required" : false,
                  validate: (value) => {
                    if (!showForm) return true;
                    const existedInPackingList = packingItems.some(
                      (item) =>
                        item?.name?.toLowerCase() === value.toLowerCase(),
                    );
                    const existedInSelectedList = selectedPackingItems.some(
                      (item) =>
                        item?.itemName?.toLowerCase() === value.toLowerCase(),
                    );
                    if (existedInPackingList || existedInSelectedList) {
                      return "Item already exists";
                    }
                    return true;
                  },
                  onChange: (e) => {
                    setItemName(e.target.value);
                    setIsEditing(false);
                  },
                })}
              />
              {/* EXISTING ITEM */}
              {existingItem && !showForm && (
                <div className="mt-4 rounded-xl border border-amber-200 bg-amber-50 p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-semibold text-amber-700">
                        This item already exists.
                      </p>

                      <p className="mt-1 text-sm text-amber-600">
                        Current quantity: {existingItem.quantity}
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={() => {
                        setShowForm(true);

                        setIsEditing(true);

                        setQuantity(existingItem.quantity);
                      }}
                      className="rounded-lg border border-blue-300 bg-white px-4 py-2 text-sm font-medium text-blue-600 hover:bg-blue-50"
                    >
                      Edit Existing Item
                    </button>
                  </div>
                </div>
              )}
              {/* NEW ITEM */}
              {itemName && !existingItem && !showForm && (
                <button
                  type="button"
                  onClick={() => setShowForm(true)}
                  className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 py-3 text-sm font-semibold text-white hover:bg-blue-700"
                >
                  <Plus size={18} />
                  Add New Item
                </button>
              )}
            </div>

            {/* FULL FORM */}
            {showForm && (
              <>
                {/* CATEGORY + QUANTITY */}

                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  {/* CATEGORY */}
                  <div>
                    <ActivitySelect
                      label="Category"
                      options={packingCategories}
                      required
                      error={errors.packing?.category?.message}
                      {...register("packing.category", {
                        required: "Category is required",
                      })}
                    />
                  </div>
                  {/* QUANTITY */}
                  <div>
                    <label className="mb-2 block text-sm font-semibold text-gray-700">
                      Quantity
                      <span className="text-red-500"> *</span>
                    </label>

                    <div className="flex overflow-hidden rounded-xl border border-gray-300 py-2">
                      {/* MINUS */}
                      <button
                        type="button"
                        onClick={() =>
                          setQuantity((prev) => (prev > 1 ? prev - 1 : 1))
                        }
                        className="flex w-24 items-center justify-center px-4 hover:bg-gray-50"
                      >
                        <Minus size={16} />
                      </button>

                      {/* VALUE */}
                      <div className="flex flex-1 items-center justify-center border-x border-gray-300 text-sm font-semibold">
                        {quantity}
                      </div>

                      {/* PLUS */}
                      <button
                        type="button"
                        onClick={() => setQuantity((prev) => prev + 1)}
                        className="flex w-24 items-center justify-center px-4 hover:bg-gray-50"
                      >
                        <Plus size={16} />
                      </button>
                    </div>
                  </div>
                </div>

                {/* STATUS */}
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  <RadioButton
                    label="Packed status"
                    name="packing.packed"
                    register={register}
                    options={[
                      {
                        label: "Packed",
                        value: "true",
                      },
                      {
                        label: "Not Packed",
                        value: "false",
                      },
                    ]}
                  />
                  <RadioButton
                    label="Required status"
                    name="packing.required"
                    register={register}
                    options={[
                      {
                        label: "Required",
                        value: "true",
                      },
                      {
                        label: "Optional",
                        value: "false",
                      },
                    ]}
                  />
                </div>

                {/* ACTION BUTTON */}
                <div className="flex gap-3">
                  <button
                    onClick={handleValidatePacking}
                    type="button"
                    className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-blue-600 py-3 text-sm font-semibold text-white hover:bg-blue-700"
                  >
                    <Plus size={18} />

                    {isEditing ? "Update Item" : "Add Item"}
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setShowForm(false);
                      reset({
                        packing: {
                          itemName: "",
                          category: "",
                          packed: "false",
                          required: "true",
                        },
                      });
                      clearErrors("packing");
                      setIsEditing(false);
                    }}
                    className="rounded-xl border px-5 py-3 text-sm font-semibold text-gray-700 hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                </div>
              </>
            )}
          </div>
        </div>

        {/* RIGHT */}
        <div className="p-4">
          {/* HEADER */}
          <div className="mb-5 border-b border-gray-300 pb-2">
            <h3 className="text-lg font-semibold text-gray-800">
              Packing Items Added ({selectedPackingItems.length})
            </h3>
          </div>
          {/* ITEMS */}
          <div className="max-h-[320px] space-y-4 overflow-y-auto pr-2">
            {selectedPackingItems.map((item, index) => (
              <PackingItem
                key={index}
                item={item}
                onEdit={handleEditPackingItem}
                onDelete={handleDeletePackingItem}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PackingSection;
