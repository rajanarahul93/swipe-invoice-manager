import { useAppDispatch } from "@/store/hooks";
import { updateInvoice } from "./invoicesSlice";
import { EditableCell } from "@/components/common/EditableCell";
import { ErrorBadge } from "@/components/common/ErrorBadge";
import { validateInvoice } from "@/utils/calculations";
import type { Invoice } from "@/types/invoice";

interface InvoiceRowProps {
  invoice: Invoice;
  index: number;
}

export const InvoiceRow = ({ invoice, index }: InvoiceRowProps) => {
  const dispatch = useAppDispatch();

  const handleUpdate = (field: keyof Invoice, value: string) => {
    const updated = { ...invoice, [field]: value as Invoice[keyof Invoice] };
    dispatch(updateInvoice(updated));
  };

  const missingFields = validateInvoice(invoice);
  const hasMissingFields = missingFields.length > 0;

  return (
    <tr className={hasMissingFields ? "bg-red-50" : ""}>
      <td className="px-4 py-3 text-sm text-gray-900">{index + 1}</td>
      <td className="px-4 py-3 text-sm">
        <EditableCell
          value={invoice.customerName}
          onSave={(val) => handleUpdate("customerName", val)}
          isEmpty={!invoice.customerName}
        />
      </td>
      <td className="px-4 py-3 text-sm">
        <EditableCell
          value={invoice.productName}
          onSave={(val) => handleUpdate("productName", val)}
          isEmpty={!invoice.productName}
        />
      </td>
      <td className="px-4 py-3 text-sm">
        <EditableCell
          value={invoice.quantity}
          onSave={(val) => handleUpdate("quantity", val)}
          type="number"
          isEmpty={invoice.quantity === 0}
        />
      </td>
      <td className="px-4 py-3 text-sm text-gray-900">
        ${invoice.tax.toFixed(2)}
      </td>
      <td className="px-4 py-3 text-sm font-medium text-gray-900">
        ${invoice.totalAmount.toFixed(2)}
      </td>
      <td className="px-4 py-3 text-sm text-gray-600">{invoice.date}</td>
      <td className="px-4 py-3">
        {hasMissingFields && (
          <ErrorBadge message={`Missing: ${missingFields.join(", ")}`} />
        )}
      </td>
    </tr>
  );
};
