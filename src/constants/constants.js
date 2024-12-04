import { FaHome, FaPen, FaPaintBrush, FaComments, FaBookOpen } from "react-icons/fa"; // Importing icons
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
      placeholderZh: "选择课程",
      type: "select",
      options: curriculumOptions,
      required: true,
    },
    {
      name: "grade",
      label: "Grade",
      placeholder: "Select Grade",
      placeholderZh: "选择年级",
      type: "select",
      options: gradeOptions,
      required: true,
    },
    {
      name: "semester",
      label: "Semester",
      placeholder: "Select Semester",
      placeholderZh: "选择学期",
      type: "select",
      options: semesterOptions,
      required: true,
    },
    {
      name: "wordType",
      label: "Word Type",
      placeholder: "Select Word Type",
      placeholderZh: "选择词汇类型",
      type: "select",
      options: wordTypeOptions,
      required: true,
    },
  ];
};

export const adminMenuItems = [
  {
    name: "Home",
    link: "/admin/",
  },
  {
    name: "Users",
    link: "/admin/users",
  },
  {
    name: "Pricing Plans",
    link: "/admin/pricing",
  },
  {
    name: "Words",
    link: "/admin/words",
  },
  {
    name: "Hanzi Stroke Coloring",
    link: "/admin/hanzi-stroke-coloring",
  },
  {
    name: "Module 1",
    link: "/admin/module-1",
  },
  {
    name: "Module 2",
    link: "/admin/module-2",
  },
];

export const UserMenuItems = [
  {
    name: "Home",
    link: "/user/dashboard",
    icon: <FaHome /> // Icon for Home
  },
  {
    name: "Stroke Order",
    link: "/user/stroke-order",
    icon: <FaPen /> // Icon for Stroke Order
  },
  {
    name: "Hanzi coloring page",
    link: "/user/coloring-page",
    icon: <FaPaintBrush /> // Icon for Hanzi Coloring Page
  },
  {
    name: "Create a dialogue",
    link: "/user/create-a-dialogue",
    icon: <FaComments /> // Icon for Create a Dialogue
  },
  {
    name: "Create a short story",
    link: "/user/create-a-story",
    icon: <FaBookOpen /> // Icon for Create a Short Story
  },
];