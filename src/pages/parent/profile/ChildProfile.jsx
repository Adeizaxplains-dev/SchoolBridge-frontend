import { useEffect, useState } from "react";
import API from "../../../services/api";
export default function ChildProfile() {
  return (
    <div className="bg-white p-6 rounded-xl shadow">

      <h2>Ahmed Musa</h2>

      <p>Class: JSS2</p>

      <p>Admission No: ADM2026/001</p>

      <p>Status: Active</p>

    </div>
  );
}