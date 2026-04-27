const CURRENCY_FORMATTER = new Intl.NumberFormat("es-AR", {
  style: "currency",
  currency: "ARS",
  maximumFractionDigits: 2,
});

export function formatPrice(value: number): string {
  return CURRENCY_FORMATTER.format(value);
}
