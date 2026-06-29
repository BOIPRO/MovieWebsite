import React from "react";
export default function InfoLayout({ children, modal }: { children: React.ReactNode; modal: React.ReactNode }) {
  return (
    <div>
      {children}
      {modal}
    </div>
  );
}