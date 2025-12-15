import { useAppDispatch } from "@/store/hooks";
import { updateProduct } from "./productsSlice";
import { syncProductUpdate } from "@/features/invoices/invoicesSlice";
import { EditableCell } from "@/components/common/EditableCell";
import type { Product } from "@/types/product";

interface ProductRowProps {
  product: Product;
}

export const ProductRow = ({ product }: ProductRowProps) => {
  const dispatch = useAppDispatch();

  const handleUpdate = (field: keyof Product, value: string) => {
    const oldName = product.name;

    const updated = { ...product, [field]: value };
    if (field === "unitPrice" || field === "tax") {
      updated.priceWithTax =
        Number(value) +
        (field === "unitPrice" ? updated.tax : updated.unitPrice);
    }

    dispatch(updateProduct(updated));

    // Sync product name changes to invoices
    if (field === "name" && value !== oldName) {
      dispatch(syncProductUpdate({ oldName, newName: value }));
    }
  };

  return (
    <tr>
      <td className="px-4 py-3 text-sm">
        <EditableCell
          value={product.name}
          onSave={(val) => handleUpdate("name", val)}
          isEmpty={!product.name}
        />
      </td>
      <td className="px-4 py-3 text-sm">
        <EditableCell
          value={product.quantity}
          onSave={(val) => handleUpdate("quantity", val)}
          type="number"
        />
      </td>
      <td className="px-4 py-3 text-sm">
        <EditableCell
          value={product.unitPrice}
          onSave={(val) => handleUpdate("unitPrice", val)}
          type="number"
        />
      </td>
      <td className="px-4 py-3 text-sm text-gray-900">
        ${product.tax.toFixed(2)}
      </td>
      <td className="px-4 py-3 text-sm font-medium text-gray-900">
        ${product.priceWithTax.toFixed(2)}
      </td>
    </tr>
  );
};
