export interface PremiumCalculationRequest {
  genderCd: string;
  dob: Date;
  planCode: string;
  premiumPerYear: number;
  paymentFrequency: "YEARLY" | "HALFYEARLY" | "QUARTERLY" | "MONTHLY";
}
