import {
  FaHome,
  FaPen,
  FaPaintBrush,
  FaComments,
  FaBookOpen,
  FaUsers,
  FaDollarSign,
  FaBook,
  FaPalette,
  FaLayerGroup,
  FaCubes,
} from "react-icons/fa"; // Importing icons
import {
  BookOpen,
  Star,
  Trophy,
  Brain,
  Rocket,
  Crown,
  PlayCircle,
  ArrowRight,
  PenTool,
  Palette,
  Gamepad,
  Sparkles,
  Medal,
  Heart,
  MessageCircle,
  Check,
} from "lucide-react";
export const wordInputs = (
  curriculumOptions,
  gradeOptions,
  semesterOptions,
  wordTypeOptions
) => {
  return [
    {
      name: "curriculum",
      label: "Curriculum",
      placeholder: "Select Curriculum",
      placeholderZh: "選擇課程",
      type: "select",
      options: curriculumOptions,
      required: true,
    },
    {
      name: "grade",
      label: "Grade",
      placeholder: "Select Grade",
      placeholderZh: "選擇年級",
      type: "select",
      options: gradeOptions,
      required: true,
    },
    {
      name: "semester",
      label: "Semester",
      placeholder: "Select Semester",
      placeholderZh: "選擇學期",
      type: "select",
      options: semesterOptions,
      required: true,
    },
    {
      name: "wordType",
      label: "Word Type",
      placeholder: "Select Word Type",
      placeholderZh: "選擇詞彙類型",
      type: "select",
      options: wordTypeOptions,
      required: true,
    },
    {
      name: "topic",
      label: "Topic",
      placeholder: "Write Topic",
      placeholderZh: "寫主題",
      type: "text",
      required: true,
    },
  ];
};

export const adminMenuItems = [
  {
    name: "Home",
    nameZh: "首頁",
    link: "/admin",
    icon: <FaHome />, // Icon for Home
  },
  {
    name: "Users",
    nameZh: "用戶管理",
    link: "/admin/users",
    icon: <FaUsers />, // Icon for Users
  },
  {
    name: "Pricing Plans",
    nameZh: "定價方案",
    link: "/admin/pricing",
    icon: <FaDollarSign />, // Icon for Pricing Plans
  },
  {
    name: "Words",
    nameZh: "單詞管理",
    link: "/admin/words",
    icon: <FaBook />, // Icon for Words
  },
];

export const UserMenuItems = [
  {
    name: "Home",
    nameZh: "首頁",
    link: "/user/dashboard",
    icon: <FaHome />, // Icon for Home
  },
  {
    name: "Stroke Order",
    nameZh: "筆順練習",
    link: "/user/stroke-order",
    icon: <FaPen />, // Icon for Stroke Order
  },
  {
    name: "Hanzi coloring page",
    nameZh: "國字塗色頁",
    link: "/user/coloring-page",
    icon: <FaPaintBrush />, // Icon for Hanzi Coloring Page
  },
  {
    name: "Create a dialogue",
    nameZh: "創建對話",
    link: "/user/create-a-dialogue",
    icon: <FaComments />, // Icon for Create a Dialogue
  },
  {
    name: "Create a short story",
    nameZh: "創建故事",
    link: "/user/create-a-story",
    icon: <FaBookOpen />, // Icon for Create a Short Story
  },
];


export const modules = [
  {
    name:"stroke",
    title: "✍️ Hanzi Stroke Practice",
    titleZh: "✍️ 漢字筆劃練習",
    description: "Master the art of Chinese characters",
    descriptionZh: "掌握漢字藝術",
    icon: <PenTool className="w-12 h-12 text-white" />,
    color: "from-purple-500 to-pink-500",
    bgColor: "bg-purple-50",
    points: [
      "Interactive stroke-by-stroke practice",
      "Learn proper writing techniques",
      "Unlock new characters as you progress",
    ],
    pointsZh: ["逐筆練習互動", "學習正確書寫技術", "隨進度解鎖新漢字"],
    achievement: "Stroke Master 🏆",
    achievementZh: "筆劃大師 🏆",
  },
  {
    name:"coloring",
    title: "🎨 Coloring Page Fun",
    titleZh: "🎨 塗色頁樂趣",
    description: "Learn through creative coloring",
    descriptionZh: "通過創意塗色學習",
    icon: <Palette className="w-12 h-12 text-white" />,
    color: "from-blue-500 to-cyan-500",
    bgColor: "bg-blue-50",
    points: [
      "Color and learn characters",
      "Fun artistic exercises",
      "Visual memory enhancement",
    ],
    pointsZh: ["塗色並學習漢字", "有趣的藝術練習", "增強視覺記憶"],
    achievement: "Creative Artist 🎨",
    achievementZh: "創意藝術家 🎨",
  },
  
  {
    name:"dialogue",
    title: "🗨️ Dialogue Practice",
    titleZh: "🗨️ 對話練習",
    description: "Speak Chinese with confidence",
    descriptionZh: "自信說中文",
    icon: <MessageCircle className="w-12 h-12 text-white" />,
    // color: "from-green-500 to-emerald-500",\
    color: "from-purple-500 to-pink-500",

    bgColor: "bg-green-50",
    points: [
      "Fun interactive dialogues",
      "Real-world conversations",
      "Perfect pronunciation",
    ],
    pointsZh: ["有趣的互動對話", "現實世界中的對話", "完美發音"],
    achievement: "Chat Champion 🎭",
    achievementZh: "對話冠軍 🎭",
  },
  {
    name:"story",
    title: "📚 Story Learning",
    titleZh: "📚 故事學習",
    description: "Learn through magical stories",
    descriptionZh: "通過魔幻故事學習",
    icon: <BookOpen className="w-12 h-12 text-white" />,
    // color: "from-orange-500 to-amber-500",
    color: "from-blue-500 to-cyan-500",

    bgColor: "bg-orange-50",
    points: [
      "Engaging story adventures",
      "Build vocabulary naturally",
      "Remember through stories",
    ],
    pointsZh: ["引人入勝的故事冒險", "自然地建立詞彙", "通過故事記憶"],
    achievement: "Story Explorer 📖",
    achievementZh: "故事探索者 📖",
  },
];