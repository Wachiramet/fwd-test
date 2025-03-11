export interface PremiumCalculationRequest {
  firstName: string;
  lastName: string;
  genderCd: string;
  dob: string;
  planCode: string;
  premiumPerYear: number;
  paymentFrequency: string;
}

export interface PremiumCalculationResponse {
  planCode: string;
  baseSumAssured: number;
  baseAnnualPremium: number;
  modalPremium: number;
  productTerm: number;
  premiumPayingTerm: number;
  paymentFrequencyCd: string;
}
