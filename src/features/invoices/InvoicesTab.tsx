import { Upload } from "lucide-react";
import { useAppSelector } from "@/store/hooks";
import { Table } from "@/components/common/Table";
import { InvoiceRow } from "./InvoiceRow";

const columns = [
  { key: "serial", label: "S.No", width: "60px" },
  { key: "customer", label: "Customer Name", width: "150px" },
  { key: "product", label: "Product Name", width: "150px" },
  { key: "quantity", label: "Quantity", width: "100px" },
  { key: "tax", label: "Tax", width: "100px" },
  { key: "total", label: "Total Amount", width: "120px" },
  { key: "date", label: "Date", width: "110px" },
  { key: "status", label: "Status", width: "100px" },
];

export const InvoicesTab = () => {
  const invoices = useAppSelector((state) => state.invoices.items);

  if (invoices.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 bg-white rounded-lg border-2 border-dashed border-gray-200">
        <div className="text-center space-y-3">
          <div className="w-16 h-16 mx-auto bg-gray-100 rounded-full flex items-center justify-center">
            <Upload className="text-gray-400" size={32} />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-900">No data yet</p>
            <p className="text-xs text-gray-500 mt-1">
              Upload files to extract and view invoices
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-900">
          All Invoices ({invoices.length})
        </h2>
      </div>
      <Table columns={columns}>
        {invoices.map((invoice, index) => (
          <InvoiceRow key={invoice.id} invoice={invoice} index={index} />
        ))}
      </Table>
    </div>
  );
};
