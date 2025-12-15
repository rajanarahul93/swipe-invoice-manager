import { Upload } from "lucide-react";
import { useAppSelector } from "@/store/hooks";
import { Table } from "@/components/common/Table";
import { CustomerRow } from "./CustomerRow";

const columns = [
  { key: "name", label: "Customer Name", width: "200px" },
  { key: "phone", label: "Phone Number", width: "150px" },
  { key: "total", label: "Total Purchase Amount", width: "180px" },
];

export const CustomersTab = () => {
  const customers = useAppSelector((state) => state.customers.items);

  if (customers.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 bg-white rounded-lg border-2 border-dashed border-gray-200">
        <div className="text-center space-y-3">
          <div className="w-16 h-16 mx-auto bg-gray-100 rounded-full flex items-center justify-center">
            <Upload className="text-gray-400" size={32} />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-900">No data yet</p>
            <p className="text-xs text-gray-500 mt-1">
              Upload files to extract and view customers
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
          All Customers ({customers.length})
        </h2>
      </div>
      <Table columns={columns}>
        {customers.map((customer) => (
          <CustomerRow key={customer.id} customer={customer} />
        ))}
      </Table>
    </div>
  );
};
