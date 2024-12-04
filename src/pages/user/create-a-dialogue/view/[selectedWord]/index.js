import React, { useEffect, useState } from "react";
import DashboardLayout from "../../../layout";
import axios from "axios";
import { useTranslations } from "next-intl";
import { withMessages } from "../../../../../lib/getMessages";
import { useRouter } from "next/router";
import { message } from "antd";

export default function Page() {
  const router = useRouter();
  const t = useTranslations("strokeOrder");
  const { selectedWord } = router.query;
  const [loading, setLoading] = useState(false);
  const [dialogue, setDialogue] = useState([]);
  const DialogueCard = ({ dialogue }) => {
    return (
      <div className="p-4 mb-2 rounded-lg shadow-md text-purple-800 text-sm bg-purple-100">
        <div className="text-purple-600 font-semibold mb-2">
          {dialogue.traditionalChinese}
        </div>
        <div className="text-purple-800">{dialogue.english}</div>
      </div>
    );
  };
  useEffect(() => {
    setLoading(true);
    if (selectedWord) {
      genDialogue();
    }

    return () => {};
  }, []);
  const genDialogue = async () => {
    // try {
    // Enhance the prompt to make it more specific and natural
    // const prompt = `Generate a short, natural dialogue in **Traditional Chinese** using the word "${selectedWord}". The dialogue should be between two people in a common everyday situation. After each line in **Traditional Chinese**, provide the English translation. Include pinyin if possible for learning purposes. Format the response as a list of objects with the following structure:
    // - 'traditionalChinese': Dialogue in Traditional Chinese
    // - 'english': English translation of the dialogue

    // Example:
    // [
    //   { "traditionalChinese": "你好！你叫什麼名字？", "english": "Hello! What is your name?" },
    //   { "traditionalChinese": "我叫小明。你呢？", "english": "My name is Xiao Ming. And you?" }
    // ]
    // Make sure the dialogue is simple enough for beginners to understand, using appropriate vocabulary.`;
    const prompt = `Create a dialogue using the word "${selectedWord}". Include both the Traditional Chinese and the English translation for each line. Format the response as a list of objects with 'traditionalChinese' and 'english' keys.
      Example:
     [
       { "traditionalChinese": "你好！你叫什麼名字？", "english": "Hello! What is your name?" },
       { "traditionalChinese": "我叫小明。你呢？", "english": "My name is Xiao Ming. And you?" }
     ]
     Make sure the dialogue is simple enough for beginners to understand, using appropriate vocabulary
    `;

    const resp = await axios.post("/api/getDialogue", { prompt });
    if (resp.status === 200) {
      message.success(t("dialogueSuccess"));
      console.log(JSON.parse(resp.data.data));
      setLoading(false);
      setDialogue(JSON.parse(resp.data.data));
      if (dialogue) console.log(dialogue);
    }
    // } catch (error) {
    //   setLoading(false);
    //   message.error(t("dialogueError"));
    // }
  };
  return (
    <DashboardLayout>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div>
          {dialogue &&
            dialogue.map((dia, index) => (
              <DialogueCard dialogue={dia} key={index} />
            ))}
        </div>
      )}
    </DashboardLayout>
  );
}

export const getServerSideProps = withMessages("strokeOrder");
