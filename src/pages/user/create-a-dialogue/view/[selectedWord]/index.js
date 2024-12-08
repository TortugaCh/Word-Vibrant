export default function Page() {
  const router = useRouter();
  const t = useTranslations("strokeOrder");
  const { selectedWord } = router.query;
  const [loading, setLoading] = useState(false);
  const [dialogue, setDialogue] = useState([]);

  // Dialogue Card Component with updated color scheme
  const DialogueCard = ({ dialogue, index }) => {
    const isEven = index % 2 === 0;

    return (
      <div
        className={`p-6 mb-6 rounded-xl shadow-lg max-w-4xl mx-auto ${
          isEven
            ? "bg-gradient-to-r from-indigo-200 via-purple-200 to-pink-200 hover:shadow-xl hover:bg-gradient-to-r hover:from-indigo-300 hover:via-purple-300 hover:to-pink-300"
            : "bg-gradient-to-r from-teal-200 via-green-200 to-yellow-200 hover:shadow-xl hover:bg-gradient-to-r hover:from-teal-300 hover:via-green-300 hover:to-yellow-300"
        }`}
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: "20px",
          boxSizing: "border-box",
          transition: "all 0.3s ease-in-out", // Fun hover effect
        }}
      >
        {/* Funky Icon for Traditional Chinese */}
        <div className={`flex items-center mb-2`}>
          <GiPencilBrush size={40} className="text-indigo-600 mr-3" />
          <div
            className={`text-xl font-semibold ${
              isEven ? "text-indigo-800 text-right" : "text-teal-800 text-left"
            }`}
            style={{ lineHeight: "1.6" }}
          >
            {dialogue.traditionalChinese}
          </div>
        </div>

        {/* Funky Icon for English Translation */}
        <div className={`flex items-center mt-2`}>
          <GiBookmarklet size={40} className="text-teal-600 mr-3" />
          <div
            className={`text-md text-gray-800 ${
              isEven ? "text-right" : "text-left"
            }`}
            style={{ lineHeight: "1.6" }}
          >
            {dialogue.english}
          </div>
        </div>
      </div>
    );
  };

  useEffect(() => {
    setLoading(true);
    if (selectedWord) {
      genDialogue();
    }

    return () => {};
  }, [selectedWord]);

  const genDialogue = async () => {
    try {
      const prompt = `Create a short dialogue using the word "${selectedWord}". Include both the Traditional Chinese and the English translation for each line. Limit the dialogue to 7-8 exchanges. Format the response as a JSON array with the following keys:
        - "traditionalChinese": Dialogue in Traditional Chinese.
        - "english": English translation of the dialogue.`;

      const resp = await axios.post("/api/getDialogue", { prompt });

      if (resp.status === 200 && Array.isArray(resp.data.data)) {
        console.log("Parsed Dialogue:", resp.data.data);
        message.success(t("dialogueSuccess"));
        setDialogue(resp.data.data); // Set the dialogue data
      } else {
        console.error("Invalid response structure:", resp.data);
        message.error("Invalid response from server.");
      }
    } catch (error) {
      console.error(
        "Error generating dialogue:",
        error.response?.data || error
      );
      message.error(error.response?.data?.error || t("dialogueError"));
      setDialogue([]); // Reset dialogue on error
    } finally {
      setLoading(false); // Ensure loading state is cleared
    }
  };

  return (
    <DashboardLayout>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div>
          {dialogue.length > 0 ? (
            dialogue.map((dia, index) => (
              <DialogueCard dialogue={dia} key={index} index={index} />
            ))
          ) : (
            <p>{t("noDialogue")}</p>
          )}
        </div>
      )}
    </DashboardLayout>
  );
}
