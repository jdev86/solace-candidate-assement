const Search = ({
  searchTerm,
  onChange,
  onClick,
}: {
  searchTerm: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onClick: () => void;
}) => (
  <div className="mb-8 w-full lg:w-1/5">
    <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 mb-2 w-full">
      <input
        className="border border-[#b5c9d6] rounded-lg px-4 py-2 text-base bg-[#f7fafc] focus:outline-none focus:border-[#2b6cb0] focus:ring-2 focus:ring-[#e6f2ff] transition-colors w-full sm:w-auto flex-1"
        value={searchTerm}
        onChange={onChange}
        placeholder="Search for advocates..."
      />
      <button
        className="bg-[#347866] text-white font-semibold rounded-lg px-4 py-2 transition-colors hover:bg-[#2b6cb0] w-full sm:w-auto"
        onClick={onClick}
      >
        Reset
      </button>
    </div>
  </div>
);

export default Search;
