import { useState } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { store } from "@/store";
import { Header } from "@/components/layout/Header";
import { TabNavigation } from "@/components/layout/TabNavigation";
import { FileUploadModal } from "@/components/upload/FileUploadModal";
import { InvoicesTab } from "@/features/invoices/InvoicesTab";
import { ProductsTab } from "@/features/products/ProductsTab";
import { CustomersTab } from "@/features/customers/CustomersTab";
import { parseFile } from "@/services/fileParser";
import { extractDataWithGemini } from "@/services/gemini";
import { addInvoices } from "@/features/invoices/invoicesSlice";
import { addProducts } from "@/features/products/productsSlice";
import {
  addCustomers,
  setCustomers,
} from "@/features/customers/customersSlice";
import { calculateCustomerTotals } from "@/utils/calculations";

export default function App() {
  const [activeTab, setActiveTab] = useState("invoices");
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);

  const dispatch = useAppDispatch();
  const invoicesCount = useAppSelector((state) => state.invoices.items.length);
  const productsCount = useAppSelector((state) => state.products.items.length);
  const customersCount = useAppSelector(
    (state) => state.customers.items.length
  );

  const tabs = [
    { id: "invoices", label: "Invoices", count: invoicesCount },
    { id: "products", label: "Products", count: productsCount },
    { id: "customers", label: "Customers", count: customersCount },
  ];

  const handleFilesAdded = (newFiles: File[]) => {
    setSelectedFiles((prev) => [...prev, ...newFiles]);
  };

  const handleFileRemove = (index: number) => {
    setSelectedFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const handleProcessFiles = async () => {
    setIsProcessing(true);

    try {
      for (const file of selectedFiles) {
        const fileContent = await parseFile(file);
        const extractedData = await extractDataWithGemini(
          fileContent,
          file.name
        );

        if (extractedData.invoices.length > 0) {
          const invoices = extractedData.invoices.map((inv, idx) => ({
            id: `${file.name}-inv-${idx}-${Date.now()}`,
            serialNumber: `INV-${Date.now()}-${idx}`,
            customerName: inv.customerName || "",
            productName: inv.productName || "",
            quantity: inv.quantity || 0,
            tax: inv.tax || 0,
            totalAmount: inv.totalAmount || 0,
            date: inv.date || new Date().toISOString().split("T")[0],
            missingFields: [],
          }));
          dispatch(addInvoices(invoices));
        }

        if (extractedData.products.length > 0) {
          const products = extractedData.products.map((prod, idx) => ({
            id: `${file.name}-prod-${idx}-${Date.now()}`,
            name: prod.name || "",
            quantity: prod.quantity || 0,
            unitPrice: prod.unitPrice || 0,
            tax: prod.tax || 0,
            priceWithTax: (prod.unitPrice || 0) + (prod.tax || 0),
          }));
          dispatch(addProducts(products));
        }

        if (extractedData.customers.length > 0) {
          const customers = extractedData.customers.map((cust, idx) => ({
            id: `${file.name}-cust-${idx}-${Date.now()}`,
            name: cust.name || "",
            phoneNumber: cust.phoneNumber || "",
            totalPurchaseAmount: 0,
          }));
          dispatch(addCustomers(customers));
        }
      }
      const currentState = store.getState();
      const customersWithTotals = calculateCustomerTotals(
        currentState.customers.items,
        currentState.invoices.items
      );
      dispatch(setCustomers(customersWithTotals));

      setSelectedFiles([]);
      setIsUploadModalOpen(false);
    } catch (error) {
      console.error("Processing error:", error);
      alert("Failed to process files. Check console for details.");
    } finally {
      setIsProcessing(false);
    }
  };

  const renderActiveTab = () => {
    switch (activeTab) {
      case "invoices":
        return <InvoicesTab />;
      case "products":
        return <ProductsTab />;
      case "customers":
        return <CustomersTab />;
      default:
        return <InvoicesTab />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header onUploadClick={() => setIsUploadModalOpen(true)} />
      <TabNavigation
        tabs={tabs}
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />
      <main className="mx-auto max-w-7xl px-6 py-8">{renderActiveTab()}</main>

      <FileUploadModal
        isOpen={isUploadModalOpen}
        onClose={() => setIsUploadModalOpen(false)}
        files={selectedFiles}
        onFilesAdded={handleFilesAdded}
        onFileRemove={handleFileRemove}
        onProcessFiles={handleProcessFiles}
        isProcessing={isProcessing}
      />
    </div>
  );
}
