"use client";

import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

function Search() {
  const [search, setSearch] = useState("");
  const router = useRouter();

  const handleSearch = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSearch("");
    router.push(`/search/${search}`);
  };

  return (
    <form onSubmit={handleSearch}>
      <input
        type="text"
        name="search"
        id="search"
        value={search}
        placeholder="Enter the search term"
        onChange={({ target }) => setSearch(target.value)}
      />
      <button
        type="submit"
        className="bg-blue-500 text-white font-bold py-2 px-4 rounded-lg"
      >
        Search
      </button>
    </form>
  );
}

export default Search;
