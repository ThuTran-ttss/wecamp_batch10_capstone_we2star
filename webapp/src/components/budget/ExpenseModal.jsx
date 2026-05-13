import {useEffect, useState} from "react";

export default function ExpenseModel ({expenses,setExpenses,selectedExpense,onClose}) {
    const isEditMode = !!selectedExpense;

    const [formData,setFormData] = useState (
        {
            id : "",
            name: "",
            category : "",
            estimatedCost : "",
            actualCost : "",
            paymentStatus : ""
        }
    )

    useEffect (() => {
        if(selectedExpense) {
            setFormData(selectedExpense);
        } else {
            setFormData({
                id : expenses.length > 0? 
                    Math.max(...expenses.map((ex) => ex.id)) + 1 : 1,
                name: "",
                category : "",
                estimatedCost : "0",
                actualCost : "0",
                paymentStatus : "" 
            });
        }
    }, [selectedExpense]);

    const handleSave = () => {

        const finalData = {
            ...formData,
            actualCost : Number(formData.actualCost),
            estimatedCost: Number(formData.estimatedCost),
        };

        if (isEditMode) {
            setExpenses((prev) =>
                prev.map((ex) => 
                ex.id === finalData.id?
                finalData : ex
            )
            );
        } else {
            setExpenses((prev) => [...prev, finalData]);
        }

        onClose();
    };

    return (
        <div className = 'fixed inset-0 bg-black/40 flex justify-center items-center'>
            <div className="bg-white p-6 rounded-xl w-[500px]"> 
                <h2 className="text-xl font-bold mb-4">
                    {
                        isEditMode?
                        "Edit Expense Item" : "Add Expense"
                    }
                </h2>

                <input 
                    type = "text"
                    placeholder="Expense Item Name"
                    value = {formData.name}
                    onChange={(e) => 
                        setFormData({
                            ...formData, name: e.target.value
                        })
                    }
                    className = "w-full border p-3 rounded mb-3"
                />
                <select
                    value = {formData.category}
                    onChange={(e) => 
                        setFormData({
                            ...formData, category: e.target.value
                        })
                    } 
                    className="w-full border p-3 rounded mb-3"
                >
                    <option value = ''> Select Category </option>
                    <option value = 'Transport'> Transport </option>
                    <option value = 'Accommodation'> Accommodation </option>
                    <option value = 'Food'> Food </option>
                    <option value = 'Shopping'> Shopping </option>
                    <option value = 'Activity'> Activity </option>
                    <option value = 'Other'> Other </option>
                </select>

                <input 
                    type = "number"
                    placeholder="Estimated Cost"
                    value = {formData.estimatedCost}
                    onChange={(e) => 
                        setFormData({
                            ...formData, estimatedCost: e.target.value
                        })
                    }
                    className="w-full border p-3 rounded mb-3"
                />

                <input 
                    type = "number"
                    placeholder="Actual Cost"
                    value = {formData.actualCost}
                    onChange={(e) => 
                        setFormData({
                            ...formData, actualCost : e.target.value
                        })
                    }
                    className="w-full border p-3 rounded mb-3"
                />

                <select
                    value = {formData.paymentStatus}
                    onChange={(e) => 
                        setFormData({
                            ...formData, paymentStatus: e.target.value
                        })
                    } 
                    className="w-full border p-3 rounded mb-3"
                >
                    <option value = ''> Select Payment Status </option>
                    <option value = 'Paid'> Paid </option>
                    <option value = 'Unpaid'> Unpaid </option>
                </select>

                <div className="flex justify-end gap-3"> 
                    <button 
                        onClick={onClose}
                        className="border px-4 py-2 rounded"
                    >
                        Cancel
                    </button>

                    <button 
                        onClick = {handleSave}
                        className="border px-4 py-2 rounded"
                    > 
                        Save
                    </button>
                </div>
            </div>
        </div>
    )
};