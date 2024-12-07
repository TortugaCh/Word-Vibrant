import { useRouter } from "next/router";
import Link from "next/link";

const InsufficientCredits = () => {
  const router = useRouter();

  const handleGoBack = () => {
    router.back();
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-purple-50">
      <div className="bg-white p-8 rounded-lg shadow-2xl text-center max-w-sm w-full">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">Insufficient Credits</h1>
        <p className="text-lg text-gray-600 mb-6">
          It seems your credits are insufficient to access this module. You can either go back or upgrade your plan to continue.
        </p>
        <div className="space-y-4">
          <button
            onClick={handleGoBack}
            className="w-full py-3 bg-purple-600 text-white font-semibold rounded-lg shadow-md transition-all hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50"
          >
            Go Back
          </button>
          <Link href="/pricing" className="text-lg text-purple-600 font-semibold hover:underline focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50">
            Upgrade Your Plan
          </Link>
        </div>
      </div>
    </div>
  );
};

export default InsufficientCredits;
