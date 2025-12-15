import { useAppDispatch } from "@/store/hooks";
import { updateCustomer } from "./customersSlice";
import { syncCustomerUpdate } from "@/features/invoices/invoicesSlice";
import { EditableCell } from "@/components/common/EditableCell";
import type { Customer } from "@/types/customer";

interface CustomerRowProps {
  customer: Customer;
}

export const CustomerRow = ({ customer }: CustomerRowProps) => {
  const dispatch = useAppDispatch();

  const handleUpdate = (field: keyof Customer, value: string) => {
    const oldName = customer.name;

    const updated = { ...customer, [field]: value };
    dispatch(updateCustomer(updated));

    // Sync customer name changes to invoices
    if (field === "name" && value !== oldName) {
      dispatch(syncCustomerUpdate({ oldName, newName: value }));
    }
  };

  return (
    <tr>
      <td className="px-4 py-3 text-sm">
        <EditableCell
          value={customer.name}
          onSave={(val) => handleUpdate("name", val)}
          isEmpty={!customer.name}
        />
      </td>
      <td className="px-4 py-3 text-sm">
        <EditableCell
          value={customer.phoneNumber}
          onSave={(val) => handleUpdate("phoneNumber", val)}
          isEmpty={!customer.phoneNumber}
        />
      </td>
      <td className="px-4 py-3 text-sm font-medium text-gray-900">
        ${customer.totalPurchaseAmount.toFixed(2)}
      </td>
    </tr>
  );
};
