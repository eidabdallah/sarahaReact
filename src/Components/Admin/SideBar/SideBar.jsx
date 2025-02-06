import React, { useState } from "react";
import { Sidebar, Menu, MenuItem } from "react-pro-sidebar";
import { Link } from "react-router-dom";
import { FaHome, FaPaperPlane, FaInbox, FaUser, FaLock, FaBars, FaTimes } from "react-icons/fa";
import styles from "./SideBar.module.css";

export default function SideBar() {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <Sidebar collapsed={collapsed} className={styles.sidebar}>
      <Menu className={styles.menu}>
        <MenuItem className={styles.toggleButton} onClick={() => setCollapsed(!collapsed)}>
          {collapsed ? <FaBars /> : <FaTimes />}
        </MenuItem>
        <MenuItem className={styles.menuItem} component={<Link to="/admin" />} icon={<FaHome />}>
          الصفحة الرئيسية
        </MenuItem>
        <MenuItem className={styles.menuItem} component={<Link to="/admin/allUser" />} icon={<FaUser />}>
          المستخدمين
        </MenuItem>
        <MenuItem className={styles.menuItem} component={<Link to="/admin/profile" />} icon={<FaUser />}>
          الملف الشخصي
        </MenuItem>
        <MenuItem className={styles.menuItem} component={<Link to="/admin/sendMessage" />} icon={<FaPaperPlane />}>
          إرسال رسالة
        </MenuItem>
        <MenuItem className={styles.menuItem} component={<Link to="/admin/messages" />} icon={<FaInbox />}>
          رسائلي
        </MenuItem>
        <MenuItem className={styles.menuItem} component={<Link to="/admin/changePassword" />} icon={<FaLock />}>
          تغيير كلمة المرور
        </MenuItem>
      </Menu>
    </Sidebar>
  );
}