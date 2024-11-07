import { useRouter } from "next/router";

export default function DashboardOptionCard({
  title,
  description,
  color,
  icon,
  route,
}) {
  const router = useRouter();

  return (
    <div
      onClick={() => router.push(route)}
      className={`${color} p-8 rounded-xl shadow-lg border hover:shadow-2xl transform hover:scale-105 transition duration-300 cursor-pointer text-center`}
    >
      <h3 className="text-3xl font-bold text-center mb-4">
        {icon} {title}
      </h3>
      <p className="text-gray-700">{description}</p>
    </div>
  );
}
