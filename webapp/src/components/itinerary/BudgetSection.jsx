import React, { useState } from "react";

import { Plus, DollarSign } from "lucide-react";

import ActivityInput from "./form/ActivityInput";
import ActivitySelect from "./form/ActivitySelect";
import { budgetCategories, paymentStatuses } from "@/constants/budget";
import BudgetItem from "./BudgetItem";
import FormButton from "./form/FormButton";

const BudgetSection = ({
  register,
  errors,
  trigger,
  getValues,
  budgetItems,
  setSelectedBudgets,
  selectedBudgets,
  reset,
  setValue,
}) => {
  const [budgetName, setBudgetName] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const existingExpense = [...budgetItems, ...selectedBudgets].find(
    (item) => item?.name?.toLowerCase() === budgetName.toLowerCase(),
  );
  const handleAddBudget = async () => {
    const isValid = await trigger([
      "budget.name",

      "budget.category",

      "budget.estimatedCost",

      "budget.paymentStatus",
    ]);

    if (!isValid) return;

    const budgetData = getValues("budget");

    const newBudget = {
      id: Date.now(),

      ...budgetData,
    };

    setSelectedBudgets((prev) => [...prev, newBudget]);

    setShowForm(false);

    setValue("budget.name", "");

    setValue("budget.category", "");

    setValue("budget.estimatedCost", "");

    setValue("budget.actualCost", "");

    setValue("budget.paymentStatus", "");

    setBudgetName("");
  };
  const handleDeleteBudgetItem = (budgetName) => {
    setSelectedBudgets((prev) =>
      prev.filter((budget) => budget.name !== budgetName),
    );
  };
  const handleEditBudgetItem = (budgetName) => {
    const selectedBudget = selectedBudgets.find(
      (budget) => budget.name === budgetName,
    );

    if (!selectedBudget) return;

    setShowForm(true);
    setIsEditing(true);

    setValue("budget.name", selectedBudget.name);

    setValue("budget.category", selectedBudget.category);

    setValue("budget.estimatedCost", selectedBudget.estimatedCost);

    setValue("budget.actualCost", selectedBudget.actualCost);

    setValue("budget.paymentStatus", selectedBudget.paymentStatus);

    setSelectedBudgets((prev) =>
      prev.filter((budget) => budget.name !== budgetName),
    );
  };
  return (
    <div className="overflow-hidden rounded-2xl border border-gray-300 bg-white transition-all duration-300">
      <div className="grid grid-cols-1 lg:grid-cols-[1.6fr_1fr]">
        {/* LEFT */}
        <div className="border-r border-gray-300 p-6">
          <div className="space-y-6">
            {/* TITLE */}
            <ActivityInput
              label="Expense Name"
              placeholder="Dinner at Old Quarter"
              required
              error={errors.budget?.name?.message}
              {...register("budget.name", {
                required: showForm ? "Expense name is required" : false,

                validate: (value) => {
                  if (!showForm) return true;

                  if (!value) {
                    return "Expense name is required";
                  }
                  const lowerValue = value.toLowerCase();

                  const existedInBudgetList = budgetItems.some((item) => {
                    if (
                      isEditing &&
                      item.name.toLowerCase() === budgetName.toLowerCase()
                    ) {
                      return false;
                    }

                    return item?.name?.toLowerCase() === lowerValue;
                  });

                  const existedInSelectedBudget = selectedBudgets.some(
                    (item) => {
                      if (
                        isEditing &&
                        item.name.toLowerCase() === budgetName.toLowerCase()
                      ) {
                        return false;
                      }

                      return item?.name?.toLowerCase() === lowerValue;
                    },
                  );

                  if (existedInBudgetList || existedInSelectedBudget) {
                    return "Expense already exists";
                  }

                  return true;
                },

                onChange: (e) => {
                  setBudgetName(e.target.value);
                },
              })}
            />
            {existingExpense && !showForm && (
              <div className="mt-4 rounded-xl border border-amber-200 bg-amber-50 p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-semibold text-amber-700">
                      This expense already exists.
                    </p>

                    <div className="mt-2 space-y-1 text-sm text-amber-700">
                      <p>
                        <span className="font-medium">Estimated Cost:</span>{" "}
                        {existingExpense.estimatedCost.toLocaleString()}
                      </p>{" "}
                      <p>
                        <span className="font-medium">Actual Cost:</span>{" "}
                        {existingExpense.actualCost.toLocaleString()}
                      </p>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      setShowForm(true);

                      setIsEditing(true);

                      setValue("budget.name", existingExpense.name);

                      setValue("budget.category", existingExpense.category);

                      setValue(
                        "budget.estimatedCost",
                        existingExpense.estimatedCost,
                      );

                      setValue("budget.actualCost", existingExpense.actualCost);

                      setValue(
                        "budget.paymentStatus",
                        existingExpense.paymentStatus,
                      );

                      setSelectedBudgets((prev) =>
                        prev.filter(
                          (budget) => budget.name !== existingExpense.name,
                        ),
                      );
                    }}
                    className="rounded-lg border border-blue-300 bg-white px-4 py-2 text-sm font-medium text-blue-600 hover:bg-blue-50"
                  >
                    Edit Existing Expense
                  </button>
                </div>
              </div>
            )}
            {/* SHOW FORM BUTTON */}
            {!showForm && budgetName && !existingExpense && (
              <FormButton
                onClick={() => setShowForm(true)}
                className="flex w-full items-center justify-center gap-2"
              >
                <Plus size={18} />
                Add Expense
              </FormButton>
            )}

            {/* FORM */}
            {showForm && (
              <>
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  <ActivitySelect
                    label="Category"
                    required
                    options={budgetCategories}
                    error={errors.budget?.category?.message}
                    {...register("budget.category", {
                      required: "Category is required",
                    })}
                  />

                  <ActivitySelect
                    label="Payment status"
                    required
                    options={paymentStatuses}
                    error={errors.budget?.paymentStatus?.message}
                    {...register("budget.paymentStatus", {
                      required: "Payment status is required",
                    })}
                  />
                </div>

                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  <ActivityInput
                    label="Estimated cost"
                    type="number"
                    placeholder=""
                    required
                    icon={DollarSign}
                    error={errors.budget?.estimatedCost?.message}
                    {...register("budget.estimatedCost", {
                      required: "Estimated cost is required",
                    })}
                  />

                  <ActivityInput
                    label="Actual cost"
                    type="number"
                    placeholder=""
                    icon={DollarSign}
                  />
                </div>

                {/* ACTIONS */}
                <div className="flex gap-3">
                  <FormButton onClick={handleAddBudget} className="w-full">
                    Save Expense
                  </FormButton>

                  <FormButton
                    variant="secondary"
                    className="w-full"
                    onClick={() => setShowForm(false)}
                  >
                    Cancel
                  </FormButton>
                </div>
              </>
            )}
          </div>
        </div>

        {/* RIGHT */}
        <div className="p-4">
          <div className="mb-5 border-b border-gray-300 pb-2">
            <h3 className="text-lg font-semibold text-gray-800">
              Expenses Added ({selectedBudgets.length})
            </h3>
          </div>

          <div className="max-h-[320px] space-y-3 overflow-y-auto pr-2">
            {selectedBudgets.map((budget) => (
              <BudgetItem
                budget={budget}
                key={budget.id}
                onDelete={handleDeleteBudgetItem}
                onEdit={handleEditBudgetItem}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BudgetSection;
