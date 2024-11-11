import { useRouter } from "next/router";
import HanziStroke from "../../../../components/HanziStroke/HanziStroke";
import Template from "../../../../components/Template";

const Page = () => {
  const router = useRouter();
  const { selectedWord } = router.query;
  if (!selectedWord) {
    return <div>Loading...</div>; // Optional: display a loading message or spinner
  }
  return (
    <Template title="Stroke Orders">
      <div className="flex gap-10">
        <div className="flex flex-col items-center space-y-6">
          <div className="font-bold text-2xl text-purple-700">Preview</div>
          <HanziStroke word={selectedWord} draw={false} />
        </div>
        <div className="flex flex-col items-center space-y-6">
          <div className="font-bold text-2xl text-purple-700">Practice</div>
          <HanziStroke word={selectedWord} draw={true} />
        </div>
      </div>
    </Template>
  );
};

export default Page;
