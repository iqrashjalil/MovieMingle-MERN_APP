import React from "react";
import { useNavigate } from "react-router-dom";
import "./admin_sidebar.css";
import { MdSpaceDashboard, MdAddBox, MdViewDay } from "react-icons/md";
import { VscRequestChanges } from "react-icons/vsc";
import { FaUsers } from "react-icons/fa";

const Admin_Sidebar = () => {
  const navigate = useNavigate();

  return (
    <section className="admin-sidebar">
      <div className="sidebar-list">
        <ul>
          <li onClick={() => navigate("/admin/dashboard")}>
            <MdSpaceDashboard className="sidebar-icon" />
            <span className="sidebar-headings">Dashboard</span>
          </li>
          <li onClick={() => navigate("/admin/addmovie")}>
            <MdAddBox className="sidebar-icon" />
            <span className="sidebar-headings"> Add New Movie</span>
          </li>
          <li onClick={() => navigate("/admin/viewallmovies")}>
            <MdViewDay className="sidebar-icon" />
            <span className="sidebar-headings"> View All Movies</span>
          </li>
          <li onClick={() => navigate("/admin/viewallrequests")}>
            <VscRequestChanges className="sidebar-icon" />
            <span className="sidebar-headings"> View All Movie Requests</span>
          </li>
        </ul>
      </div>
    </section>
  );
};

export default Admin_Sidebar;
