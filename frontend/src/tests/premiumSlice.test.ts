import { expect, test } from "@jest/globals";
import premiumReducer, {
  calculatePremium,
  PremiumState,
} from "../store/premiumSlice";
import { PremiumCalculationResponse } from "../types/premiumTypes";

describe("Premium Slice", () => {
  test("should handle premium calculation", () => {
    const initialState: PremiumState = { result: null, status: "idle" };
    const mockResponse: PremiumCalculationResponse = {
      planCode: "T11A20",
      baseSumAssured: 200000,
      baseAnnualPremium: 10000,
      modalPremium: 833.33,
      productTerm: 5,
      premiumPayingTerm: 5,
      paymentFrequencyCd: "MONTHLY",
    };

    const action = {
      type: calculatePremium.fulfilled.type,
      payload: mockResponse,
    };
    const state = premiumReducer(initialState, action);

    expect(state.result).toEqual(mockResponse);
    expect(state.status).toBe("succeeded");
  });
});
