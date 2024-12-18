import WordsHandler from "../../../components/WordsHandler/WordsHandler";
import AdminLayout from "../layout";

const AdminPage = () => {
  return (
    <AdminLayout>

    <div className="p-10">
      <h1 className="text-4xl font-bold text-center mb-10">Admin Dashboard</h1>
      <WordsHandler />
    </div>
    </AdminLayout>
  );
};

export default AdminPage;
