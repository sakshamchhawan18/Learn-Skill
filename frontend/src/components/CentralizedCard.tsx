"use client";
import { Card } from "@mui/material";
import React from "react";

interface CentralizedCardProps {
  children?: React.ReactNode;
}

const CentralizedCard: React.FC<CentralizedCardProps> = ({ children }) => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        flexDirection: "row",
      }}
    >
      <Card style={{ minWidth: 400, padding: 20 }}>{children}</Card>
    </div>
  );
};

export default CentralizedCard;
