import axios from "axios";
import React, { useEffect, useState } from "react";
import LoadingPage from "../../Shared/Loading.jsx";
import Swal from "sweetalert2";
import { Bounce, toast } from "react-toastify";

export default function DisplayUser() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [hasUsers, setHasUsers] = useState(false);

  const getUsers = async () => {
    try {
      setLoading(true);
      setError(null);

      const token = localStorage.getItem("userToken");
      const response = await axios.get(`${import.meta.env.VITE_BURL}/user`, {
        headers: { Authorization: `Saraha__${token}` },
      });

      setUsers(response.data.users);
      setHasUsers(response.data.users.length > 0);
    } catch (error) {
      setError(error.response?.data?.errors || "حدث خطأ أثناء جلب البيانات");
    } finally {
      setLoading(false);
    }
  };

  const deleteUser = async (userId) => {
    const result = await Swal.fire({
      title: "هل أنت متأكد؟",
      text: "لن تتمكن من التراجع عن هذا!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "نعم، احذفه!",
      cancelButtonText: "إلغاء",
    });

    if (!result.isConfirmed) return;

    try {
      const token = localStorage.getItem("userToken");
      await axios.delete(`${import.meta.env.VITE_BURL}/user/${userId}`, {
        headers: { Authorization: `Saraha__${token}` },
      });

      const updatedUsers = users.filter((user) => user.id !== userId);
      setUsers(updatedUsers);
      setHasUsers(updatedUsers.length > 0);

      Swal.fire("تم الحذف!", "تم حذف المستخدم بنجاح.", "success");
    } catch (error) {
      Swal.fire("خطأ!", error.response?.data?.errors || "حدث خطأ أثناء الحذف", "error");
    }
  };

  const changeRole = async (userId, currentRole) => {
    const { isConfirmed } = await Swal.fire({
      title: "هل أنت متأكد؟",
      text: `سيتم تغيير دور المستخدم إلى ${currentRole === "admin" ? "مستخدم" : "أدمن"}!`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "نعم، قم بالتغيير!",
      cancelButtonText: "إلغاء",
    });
  
    if (!isConfirmed) return;
  
    try {
      setLoading(true);
      const token = localStorage.getItem("userToken");
      const newRole = currentRole === "admin" ? "user" : "admin";
  
      await axios.patch(
        `${import.meta.env.VITE_BURL}/user/changeRole/${userId}`,
        { role: newRole },
        {
          headers: { Authorization: `Saraha__${token}` },
        }
      );
  
      const updatedUsers = users.map((user) =>
        user.id === userId ? { ...user, role: newRole } : user
      );
  
      setUsers(updatedUsers);
      toast.success("تم التغيير بنجاح!", {
        position: "top-right",
        autoClose: 5000,
        theme: "dark",
        transition: Bounce,
      });
    } catch (error) {
      Swal.fire("خطأ!", error.response?.data?.errors || "حدث خطأ أثناء التغيير", "error");
    } finally {
      setLoading(false);
    }
  };
  
  
  useEffect(() => {
    getUsers();
  }, []);

  if (loading) {
    return <LoadingPage />;
  }

  return (
    <div className="container py-4">
      <h2 className="text-center mb-4">قائمة المستخدمين</h2>
      {hasUsers ? (
        <table className="table table-striped">
          <thead>
            <tr>
              <th>#</th>
              <th>اسم المستخدم</th>
              <th>رابط المستخدم</th>
              <th>الدور</th>
              <th>الحدف</th>
              <th>تغيير المنصب</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={user.id}>
                <td>{index + 1}</td>
                <td>{user.userName}</td>
                <td>{user.urlUser}</td>
                <td>{user.role == "admin" ? "ادمن" : "مستخدم"}</td>
                <td>
                  <button className="btn btn-danger btn-sm" onClick={() => deleteUser(user.id)}>
                    حذف
                  </button>
                </td>
                <td>
                  <button className="btn btn-warning btn-sm" onClick={() => changeRole(user.id, user.role)}>
                    تغيير
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div className="alert alert-info text-center">لا يوجد مستخدمون</div>
      )}
    </div>
  );

}
