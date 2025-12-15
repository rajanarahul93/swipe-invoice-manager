import { Upload } from "lucide-react";
import { useAppSelector } from "@/store/hooks";
import { Table } from "@/components/common/Table";
import { ProductRow } from "./ProductRow";

const columns = [
  { key: "name", label: "Product Name", width: "200px" },
  { key: "quantity", label: "Quantity", width: "120px" },
  { key: "unitPrice", label: "Unit Price", width: "120px" },
  { key: "tax", label: "Tax", width: "100px" },
  { key: "priceWithTax", label: "Price with Tax", width: "140px" },
];

export const ProductsTab = () => {
  const products = useAppSelector((state) => state.products.items);

  if (products.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 bg-white rounded-lg border-2 border-dashed border-gray-200">
        <div className="text-center space-y-3">
          <div className="w-16 h-16 mx-auto bg-gray-100 rounded-full flex items-center justify-center">
            <Upload className="text-gray-400" size={32} />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-900">No data yet</p>
            <p className="text-xs text-gray-500 mt-1">
              Upload files to extract and view products
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
          All Products ({products.length})
        </h2>
      </div>
      <Table columns={columns}>
        {products.map((product) => (
          <ProductRow key={product.id} product={product} />
        ))}
      </Table>
    </div>
  );
};
