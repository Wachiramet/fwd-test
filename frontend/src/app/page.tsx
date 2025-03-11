import PremiumCalculator from "../components/PremiumCalculator";

export default function Home() {
  return (
    <main className="p-10 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Insurance Premium Calculator</h1>
      <PremiumCalculator />
    </main>
  );
}
