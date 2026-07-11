import { describe, expect, it } from "vitest";
import {
  calculateAge,
  calculateDiscount,
  calculateEMI,
  calculateFD,
  calculateGstExclusive,
  calculateGstInclusive,
  calculateProfitMargin,
  calculateSIP,
  parseLocalDate,
  percentageChange,
  percentageOf,
  reversePercentageAfterIncrease,
  reversePercentageBase,
  whatPercent,
} from "./calculators";

describe("calculator helpers", () => {
  it("computes GST values correctly", () => {
    expect(calculateGstExclusive(1000, 18)).toMatchObject({
      originalAmount: 1000,
      gstAmount: 180,
      cgst: 90,
      sgst: 90,
      totalAmount: 1180,
    });

    expect(calculateGstInclusive(1180, 18)).toMatchObject({
      originalAmount: 1000,
      gstAmount: 180,
      totalAmount: 1180,
    });
  });

  it("handles percentage calculations and reverse percentage safely", () => {
    expect(percentageOf(18, 1000)).toBe(180);
    expect(whatPercent(180, 1000)).toBe(18);
    expect(percentageChange(500, 750)).toBe(50);
    expect(reversePercentageAfterIncrease(110, 10)).toEqual({ original: 100, difference: 10 });
    expect(reversePercentageBase(25, 20)).toEqual({ original: 125, difference: 100 });
  });

  it("clamps discount inputs to sensible non-negative results", () => {
    expect(calculateDiscount(100, 150)).toEqual({ discountAmount: 100, finalPrice: 0, youSave: 100 });
    expect(calculateDiscount(100, -20)).toEqual({ discountAmount: 0, finalPrice: 100, youSave: 0 });
  });

  it("handles profit margin edge cases without crashing", () => {
    expect(calculateProfitMargin(500, 300)).toEqual({ profit: -200, profitPercentOnCost: -40, marginPercentOnSale: -66.67 });
    expect(calculateProfitMargin(0, 100)).toEqual({ profit: 100, profitPercentOnCost: 0, marginPercentOnSale: 100 });
  });

  it("validates dates and age calculations", () => {
    expect(parseLocalDate("2023-02-30")).toBeNull();
    const today = new Date(2024, 0, 15);
    const result = calculateAge(new Date(2000, 0, 1), today);
    expect(result).toMatchObject({ years: 24, months: 0, days: 14, totalDays: 8780 });
  });

  it("returns safe finance results for zero or invalid inputs", () => {
    expect(calculateEMI(0, 8.5, 5)).toEqual({ emi: 0, totalInterest: 0, totalPayment: 0 });
    expect(calculateSIP(0, 12, 10)).toEqual({ invested: 0, estimatedReturns: 0, maturityValue: 0 });
    expect(calculateFD(0, 7.5, 5)).toEqual({ maturity: 0, interest: 0, invested: 0 });
  });
});
