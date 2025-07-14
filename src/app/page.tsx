"use client";

import { useState } from "react";
import Search from "./components/Search";
import AdvocatesTable from "./components/AdvocatesTable";

export default function Home() {
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setPage(1); // Reset to first page on new search
  };

  const onClick = () => {
    setSearchTerm("");
    setPage(1);
  };

  return (
    <main>
      <div className="logo">Solace Advocates</div>
      <Search onChange={onChange} searchTerm={searchTerm} onClick={onClick} />
      <AdvocatesTable searchTerm={searchTerm} page={page} setPage={setPage} />
    </main>
  );
}
