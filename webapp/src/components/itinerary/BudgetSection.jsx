import React, { useState } from "react";

import { Plus, DollarSign } from "lucide-react";

import ActivityInput from "./form/ActivityInput";
import ActivitySelect from "./form/ActivitySelect";
import { budgetCategories } from "@/constants/budget";

const paymentStatuses = ["Paid", "Pending"];

const BudgetSection = ({
  register,
  errors,
  trigger,
  getValues,
  budgets,
  setBudgets,
}) => {
  const [showForm, setShowForm] = useState(false);

  const handleAddBudget = async () => {
    const isValid = await trigger([
      "budget.title",

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

    setBudgets((prev) => [...prev, newBudget]);

    setShowForm(false);
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
              error={errors.budget?.title?.message}
              {...register("budget.title", {
                required: "Expense name is required",
              })}
            />

            {/* SHOW FORM BUTTON */}
            {!showForm && (
              <button
                type="button"
                onClick={() => setShowForm(true)}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 py-3 text-sm font-semibold text-white hover:bg-blue-700"
              >
                <Plus size={18} />
                Add Expense
              </button>
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
                    placeholder="100"
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
                    placeholder="90"
                    icon={DollarSign}
                  />
                </div>

                {/* ACTIONS */}
                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={handleAddBudget}
                    className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-blue-600 py-3 text-sm font-semibold text-white hover:bg-blue-700"
                  >
                    Save Expense
                  </button>

                  <button
                    type="button"
                    onClick={() => setShowForm(false)}
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
          <div className="mb-5 border-b border-gray-300 pb-2">
            <h3 className="text-lg font-semibold text-gray-800">
              Expenses Added ({budgets.length})
            </h3>
          </div>

          <div className="max-h-[320px] space-y-3 overflow-y-auto pr-2">
            {budgets.map((budget) => (
              <div
                key={budget.id}
                className="rounded-xl border border-gray-200 p-4"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-semibold text-gray-800">
                      {budget.title}
                    </h4>

                    <p className="mt-1 text-sm text-gray-500">
                      {budget.category}
                    </p>
                  </div>

                  <div className="text-right">
                    <p className="font-semibold text-gray-800">
                      ${budget.estimatedCost}
                    </p>

                    <span className="text-xs text-blue-600">
                      {budget.paymentStatus}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BudgetSection;
