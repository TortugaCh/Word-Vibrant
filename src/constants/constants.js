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

