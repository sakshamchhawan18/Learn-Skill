"use client";
import React from "react";
import { useRouter } from "next/navigation";

const RoleSelection = () => {
  const router = useRouter();

  const handleStudentClick = () => {
    router.push("/student");
  };

  const handleTeacherClick = () => {
    router.push("/teacher");
  };

  return (
    <div className="flex justify-center items-center m-10">
      <div className="flex gap-2">
        <div
          onClick={handleStudentClick}
          className="cursor-pointer w-64 p-4 bg-white shadow-md rounded-lg text-center hover:shadow-lg transition duration-300"
        >
          <h2 className="text-xl font-semibold text-gray-900 ">Student</h2>
          <p className="text-gray-600">Click here if you are a student</p>
        </div>
        <div
          onClick={handleTeacherClick}
          className="cursor-pointer w-64 p-4 bg-white shadow-md rounded-lg text-center hover:shadow-lg transition duration-300"
        >
          <h2 className="text-xl font-semibold text-gray-900">Teacher</h2>
          <p className="text-gray-600">Click here if you are a teacher</p>
        </div>
      </div>
    </div>
  );
};

export default RoleSelection;
