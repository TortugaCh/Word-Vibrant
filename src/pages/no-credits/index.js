import { useRouter } from "next/router";
import Link from "next/link";

const InsufficientCredits = () => {
  const router = useRouter();

  const handleGoBack = () => {
    router.back(); 
  };

  return (
    <div>
      Your credits are either insufficient for this module or you've run out of
      credits. <button onClick={handleGoBack}>Go back</button> or{" "}
      <Link href="/pricing">Upgrade your plan</Link>
    </div>
  );
};

export default InsufficientCredits;
