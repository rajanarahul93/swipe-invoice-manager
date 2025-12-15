import type { Invoice } from "@/types/invoice";
import type { Customer } from "@/types/customer";

export function calculateCustomerTotals(
  customers: Customer[],
  invoices: Invoice[]
): Customer[] {
  return customers.map((customer) => {
    const customerInvoices = invoices.filter(
      (inv) => inv.customerName.toLowerCase() === customer.name.toLowerCase()
    );
    const total = customerInvoices.reduce(
      (sum, inv) => sum + inv.totalAmount,
      0
    );

    return {
      ...customer,
      totalPurchaseAmount: total,
    };
  });
}

export function validateInvoice(invoice: Invoice): string[] {
  const missing: string[] = [];

  if (!invoice.customerName || invoice.customerName.trim() === "") {
    missing.push("Customer Name");
  }
  if (!invoice.productName || invoice.productName.trim() === "") {
    missing.push("Product Name");
  }
  if (invoice.quantity <= 0) {
    missing.push("Quantity");
  }
  if (invoice.totalAmount <= 0) {
    missing.push("Total Amount");
  }

  return missing;
}
