import { useRouter } from "next/router";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { withMessages } from "../../lib/getMessages";

export default function InsufficientCredits() {
  const t = useTranslations("common");
  const router = useRouter();

  const handleGoBack = () => {
    router.push("/user/dashboard");
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-purple-50">
      <div className="bg-white p-8 rounded-lg shadow-2xl text-center max-w-sm w-full">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">
          {t("noCredits.insufficientCredits")}
        </h1>
        <p className="text-lg text-gray-600 mb-6">{t("noCredits.heading")}</p>
        <div className="space-y-4">
          <button
            onClick={handleGoBack}
            className="w-full py-3 bg-purple-600 text-white font-semibold rounded-lg shadow-md transition-all hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50"
          >
            {t("noCredits.goToDashboard")}
          </button>
          <Link
            href="/pricing"
            className="text-lg text-purple-600 font-semibold hover:underline focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50"
          >
            {t("noCredits.upgradePlan")}
          </Link>
        </div>
      </div>
    </div>
  );
}

export const getServerSideProps = withMessages("common");
