// -----------------------------------------------------------------------
// Pure calculation helpers used across the calculator pages.
// Kept dependency-free & framework-agnostic so they are easy to unit test.
// -----------------------------------------------------------------------

export const GST_RATES = [0, 3, 5, 12, 18, 28] as const;

export interface GstResult {
  originalAmount: number;
  gstAmount: number;
  cgst: number;
  sgst: number;
  totalAmount: number;
  rate: number;
}

/** GST Exclusive: user enters amount BEFORE tax, we add GST on top. */
export function calculateGstExclusive(amount: number, rate: number): GstResult {
  const gstAmount = (amount * rate) / 100;
  return {
    originalAmount: round2(amount),
    gstAmount: round2(gstAmount),
    cgst: round2(gstAmount / 2),
    sgst: round2(gstAmount / 2),
    totalAmount: round2(amount + gstAmount),
    rate,
  };
}

/** GST Inclusive: user enters amount AFTER tax, we extract the base + GST. */
export function calculateGstInclusive(amount: number, rate: number): GstResult {
  const originalAmount = (amount * 100) / (100 + rate);
  const gstAmount = amount - originalAmount;
  return {
    originalAmount: round2(originalAmount),
    gstAmount: round2(gstAmount),
    cgst: round2(gstAmount / 2),
    sgst: round2(gstAmount / 2),
    totalAmount: round2(amount),
    rate,
  };
}

/** Reverse GST: same math as inclusive, exposed separately for clarity/UX. */
export function calculateReverseGst(totalAmount: number, rate: number): GstResult {
  return calculateGstInclusive(totalAmount, rate);
}

export interface PercentageResult {
  value: number;
}

/** What is X% of Y */
export function percentageOf(percent: number, of: number): number {
  return round2((percent / 100) * of);
}

/** X is what percent of Y */
export function whatPercent(x: number, y: number): number {
  if (y === 0) return 0;
  return round2((x / y) * 100);
}

/** Percentage increase/decrease from one value to another */
export function percentageChange(from: number, to: number): number {
  if (from === 0) return 0;
  return round2(((to - from) / from) * 100);
}

export interface DiscountResult {
  discountAmount: number;
  finalPrice: number;
  youSave: number;
}

export function calculateDiscount(price: number, discountPercent: number): DiscountResult {
  const safePrice = Math.max(0, price);
  const safeDiscountPercent = Math.max(0, Math.min(100, discountPercent));
  const discountAmount = (safePrice * safeDiscountPercent) / 100;
  return {
    discountAmount: round2(discountAmount),
    finalPrice: round2(Math.max(0, safePrice - discountAmount)),
    youSave: round2(discountAmount),
  };
}

export interface ProfitMarginResult {
  profit: number;
  profitPercentOnCost: number;
  marginPercentOnSale: number;
}

export function calculateProfitMargin(costPrice: number, sellingPrice: number): ProfitMarginResult {
  const profit = sellingPrice - costPrice;
  return {
    profit: round2(profit),
    profitPercentOnCost: costPrice === 0 ? 0 : round2((profit / costPrice) * 100),
    marginPercentOnSale: sellingPrice === 0 ? 0 : round2((profit / sellingPrice) * 100),
  };
}

export function round2(value: number): number {
  if (Number.isNaN(value) || !Number.isFinite(value)) return 0;
  return Math.round(value * 100) / 100;
}

export function formatINR(value: number): string {
  if (Number.isNaN(value) || !Number.isFinite(value)) value = 0;
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 2,
  }).format(value);
}

// ----------------- NEW UTILITY CALCULATORS FOR TOOL HUB -----------------

export interface AgeResult {
  years: number;
  months: number;
  days: number;
  totalDays: number;
  totalMonths: number;
  nextBirthdayDays: number;
  nextBirthdayDate: Date | null;
}

export function parseLocalDate(dateString: string): Date | null {
  // Parse YYYY-MM-DD as local date to avoid UTC shift bug (new Date('2000-01-01') is UTC)
  if (!dateString) return null;
  const parts = dateString.split("-");
  if (parts.length !== 3) return null;
  const y = Number(parts[0]);
  const m = Number(parts[1]) - 1;
  const d = Number(parts[2]);
  if (!Number.isFinite(y) || !Number.isFinite(m) || !Number.isFinite(d)) return null;
  const date = new Date(y, m, d);
  if (isNaN(date.getTime())) return null;
  // Validate that components didn't roll over (e.g., 2023-02-30)
  if (date.getFullYear() !== y || date.getMonth() !== m || date.getDate() !== d) return null;
  return date;
}

function isLeapYear(year: number): boolean {
  return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
}

export function calculateAge(dob: Date, today: Date = new Date()): AgeResult {
  if (!(dob instanceof Date) || isNaN(dob.getTime())) {
    return { years: 0, months: 0, days: 0, totalDays: 0, totalMonths: 0, nextBirthdayDays: 0, nextBirthdayDate: null };
  }
  // Normalize both dates to midnight local to avoid hour-based off-by-one
  const todayMidnight = new Date(today.getFullYear(), today.getMonth(), today.getDate());
  const dobMidnight = new Date(dob.getFullYear(), dob.getMonth(), dob.getDate());

  if (dobMidnight > todayMidnight) {
    return { years: 0, months: 0, days: 0, totalDays: 0, totalMonths: 0, nextBirthdayDays: 0, nextBirthdayDate: null };
  }

  let years = todayMidnight.getFullYear() - dobMidnight.getFullYear();
  let months = todayMidnight.getMonth() - dobMidnight.getMonth();
  let days = todayMidnight.getDate() - dobMidnight.getDate();

  if (days < 0) {
    const prevMonth = new Date(todayMidnight.getFullYear(), todayMidnight.getMonth(), 0);
    days += prevMonth.getDate();
    months--;
  }
  if (months < 0) {
    months += 12;
    years--;
  }
  if (years < 0) years = 0;
  if (months < 0) months = 0;
  if (days < 0) days = 0;

  const msPerDay = 1000 * 60 * 60 * 24;
  const totalDays = Math.max(0, Math.floor((todayMidnight.getTime() - dobMidnight.getTime()) / msPerDay));
  const totalMonths = years * 12 + months;

  // Next birthday — handle Feb 29 in non-leap years by using Feb 28
  let nextBirthday: Date;
  const dobMonth = dobMidnight.getMonth();
  const dobDay = dobMidnight.getDate();
  if (dobMonth === 1 && dobDay === 29 && !isLeapYear(todayMidnight.getFullYear())) {
    nextBirthday = new Date(todayMidnight.getFullYear(), 1, 28);
  } else {
    nextBirthday = new Date(todayMidnight.getFullYear(), dobMonth, dobDay);
  }

  // If birthday today, nextBirthdayDays should be 0, otherwise future
  if (nextBirthday < todayMidnight) {
    const nextYear = todayMidnight.getFullYear() + 1;
    if (dobMonth === 1 && dobDay === 29 && !isLeapYear(nextYear)) {
      nextBirthday = new Date(nextYear, 1, 28);
    } else {
      nextBirthday = new Date(nextYear, dobMonth, dobDay);
    }
  }

  // If birthday is today, days = 0
  const nextBirthdayDays =
    nextBirthday.getTime() === todayMidnight.getTime()
      ? 0
      : Math.ceil((nextBirthday.getTime() - todayMidnight.getTime()) / msPerDay);

  return {
    years,
    months,
    days,
    totalDays: totalDays < 0 ? 0 : totalDays,
    totalMonths: totalMonths < 0 ? 0 : totalMonths,
    nextBirthdayDays: nextBirthdayDays < 0 ? 0 : nextBirthdayDays,
    nextBirthdayDate: nextBirthday,
  };
}

export interface EmiResult {
  emi: number;
  totalInterest: number;
  totalPayment: number;
}

export function calculateEMI(principal: number, annualRate: number, years: number): EmiResult {
  const safePrincipal = principal > 0 ? principal : 0;
  const safeYears = years > 0 ? years : 0;
  const months = Math.max(0, Math.round(safeYears * 12));
  if (months === 0 || safePrincipal <= 0) return { emi: 0, totalInterest: 0, totalPayment: 0 };
  const monthlyRate = annualRate / 12 / 100;
  if (monthlyRate === 0) {
    const emi = safePrincipal / months;
    return { emi: round2(emi), totalInterest: 0, totalPayment: round2(safePrincipal) };
  }
  const pow = Math.pow(1 + monthlyRate, months);
  if (!isFinite(pow)) return { emi: 0, totalInterest: 0, totalPayment: 0 };
  const emi = (safePrincipal * monthlyRate * pow) / (pow - 1);
  const totalPayment = emi * months;
  return { emi: round2(emi), totalInterest: round2(totalPayment - safePrincipal), totalPayment: round2(totalPayment) };
}

export interface SipResult {
  invested: number;
  estimatedReturns: number;
  maturityValue: number;
}

export function calculateSIP(monthlyInvestment: number, annualRate: number, years: number): SipResult {
  const safeMonthly = monthlyInvestment > 0 ? monthlyInvestment : 0;
  const safeYears = years > 0 ? years : 0;
  const months = Math.max(0, Math.round(safeYears * 12));
  const monthlyRate = annualRate / 12 / 100;
  if (months === 0 || safeMonthly === 0) return { invested: 0, estimatedReturns: 0, maturityValue: 0 };
  const invested = safeMonthly * months;
  let maturityValue: number;
  if (monthlyRate === 0) {
    maturityValue = invested;
  } else {
    const pow = Math.pow(1 + monthlyRate, months);
    if (!isFinite(pow)) return { invested: round2(invested), estimatedReturns: 0, maturityValue: round2(invested) };
    maturityValue = safeMonthly * ((pow - 1) / monthlyRate) * (1 + monthlyRate);
  }
  return {
    invested: round2(invested),
    maturityValue: round2(maturityValue),
    estimatedReturns: round2(maturityValue - invested),
  };
}

export interface FdResult {
  maturity: number;
  interest: number;
  invested: number;
}

export function calculateFD(principal: number, annualRate: number, years: number, compoundingFrequency: number = 4): FdResult {
  const safePrincipal = principal > 0 ? principal : 0;
  const safeYears = years > 0 ? years : 0;
  const safeFreq = compoundingFrequency > 0 ? compoundingFrequency : 4;
  if (safePrincipal <= 0 || safeYears <= 0) return { maturity: round2(safePrincipal), interest: 0, invested: round2(safePrincipal) };
  const ratePerPeriod = annualRate / 100 / safeFreq;
  const periods = safeFreq * safeYears;
  const pow = Math.pow(1 + ratePerPeriod, periods);
  const maturity = isFinite(pow) ? safePrincipal * pow : safePrincipal;
  return { maturity: round2(maturity), interest: round2(maturity - safePrincipal), invested: round2(safePrincipal) };
}

export interface ReversePercentageResult {
  original: number;
  difference: number;
}

export function reversePercentageAfterIncrease(finalValue: number, percent: number): ReversePercentageResult {
  // Handles edge where percent = -100% => divisor 0 => original infinite. Return 0 safely.
  const divisor = 1 + percent / 100;
  if (divisor <= 0) {
    // If final after -100% or more, original cannot be determined meaningfully for UI
    return { original: 0, difference: round2(finalValue) };
  }
  const original = finalValue / divisor;
  return { original: round2(original), difference: round2(finalValue - original) };
}

export function reversePercentageBase(percentValue: number, percent: number): ReversePercentageResult {
  // If percentValue is percent% of original, original = percentValue * 100 / percent
  // Guard division by zero
  if (percent === 0) return { original: 0, difference: round2(-percentValue) };
  const original = (percentValue * 100) / percent;
  if (!isFinite(original)) return { original: 0, difference: 0 };
  return { original: round2(original), difference: round2(original - percentValue) };
}
