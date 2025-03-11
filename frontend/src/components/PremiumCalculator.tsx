"use client";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { calculatePremium } from "../store/premiumSlice";
import { RootState, AppDispatch } from "../store/store";
import { fetchProducts } from "@/store/productSlice";

export default function PremiumCalculator() {
  const dispatch = useDispatch<AppDispatch>();
  const { list: products, status: productStatus } = useSelector(
    (state: RootState) => state.products
  );
  const { result, status } = useSelector((state: RootState) => state.premium);

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    genderCd: "MALE",
    dob: "",
    planCode: "T11A20",
    premiumPerYear: 10000,
    paymentFrequency: "MONTHLY",
  });

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  useEffect(() => {
    if (products.length > 0 && !form.planCode) {
      setForm((prev) => ({ ...prev, planCode: products[0].planCode }));
    }
  }, [products]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    dispatch(calculatePremium(form));
  };

  return (
    <div className="p-4 border rounded-md shadow-md bg-white">
      <h2 className="text-xl font-bold mb-4">Premium Calculator</h2>

      <div className="grid grid-cols-2 gap-4">
        <div className="flex flex-col">
          <label>First Name:</label>
          <input
            type="text"
            name="firstName"
            value={form.firstName}
            onChange={handleChange}
            placeholder="First Name"
            className="border p-2 rounded"
          />
        </div>
        <div className="flex flex-col">
          <label>Last Name:</label>
          <input
            type="text"
            name="lastName"
            value={form.lastName}
            onChange={handleChange}
            placeholder="Last Name"
            className="border p-2 rounded"
          />
        </div>
        <div className="flex flex-col">
          <label>Gender</label>
          <select
            name="genderCd"
            value={form.genderCd}
            onChange={handleChange}
            className="border p-2 rounded"
          >
            <option value="MALE">Male</option>
            <option value="FEMALE">Female</option>
          </select>
        </div>
        <div className="flex flex-col">
          <label>Date of birth</label>
          <input
            type="date"
            name="dob"
            value={form.dob}
            onChange={handleChange}
            className="border p-2 rounded"
          />
        </div>
        <div className="flex flex-col">
          <label>Plan Code</label>
          <select
            name="planCode"
            value={form.planCode}
            onChange={handleChange}
            className="border p-2 rounded"
          >
            {productStatus === "loading" ? (
              <option>Loading...</option>
            ) : (
              products.map((product) => (
                <option key={product.planCode} value={product.planCode}>
                  {product.packageName} ({product.planCode})
                </option>
              ))
            )}
          </select>
        </div>
        <div className="flex flex-col">
          <label>Premium Per Year</label>
          <input
            type="number"
            name="premiumPerYear"
            value={form.premiumPerYear}
            onChange={handleChange}
            className="border p-2 rounded"
          />
        </div>
        <div className="flex flex-col">
          <label>Payment Frequency</label>
          <select
            name="paymentFrequency"
            value={form.paymentFrequency}
            onChange={handleChange}
            className="border p-2 rounded"
          >
            <option value="YEARLY">Yearly</option>
            <option value="HALFYEARLY">Halfyearly</option>
            <option value="QUARTERLY">Quarterly</option>
            <option value="MONTHLY">Monthly</option>
          </select>
        </div>
      </div>

      <button
        className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
        onClick={handleSubmit}
        disabled={status === "loading"}
      >
        {status === "loading" ? "Calculating..." : "Calculate"}
      </button>

      {result && (
        <div className="mt-4 p-4 border rounded-md bg-gray-100">
          <h3 className="font-semibold">Calculation Result:</h3>
          <p>Plan Code: {result.planCode}</p>
          <p>Base Sum Assured: {result.baseSumAssured}</p>
          <p>Base Annual Premium: {result.baseAnnualPremium}</p>
          <p>Modal Premium: {result.modalPremium?.toFixed(2)}</p>
          <p>Product Term: {result.productTerm} years</p>
          <p>Premium Paying Term: {result.premiumPayingTerm} years</p>
          <p>Payment Frequency: {result.paymentFrequencyCd}</p>
        </div>
      )}
    </div>
  );
}
