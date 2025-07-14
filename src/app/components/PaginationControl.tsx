type PaginationControlProps = {
  setPage: (page: number) => void;
  pages: number[];
  page: number;
};

const PaginationControl = ({
  setPage,
  pages,
  page,
}: PaginationControlProps) => (
  <div className="mt-6 flex gap-2 items-center flex-wrap">
    {pages.map((p) => (
      <button
        key={p}
        onClick={() => setPage(p)}
        className={`rounded-md px-3 py-1 sm:px-4 sm:py-2 font-semibold border-none cursor-pointer transition-all duration-150 text-sm sm:text-base
${
  p === page
    ? "bg-[#347866] text-white border-2 border-[#255B4E] scale-105 shadow-md"
    : "bg-[#e6f2ff] text-[#347866] border border-transparent hover:bg-[#38b2ac] hover:text-white active:bg-[#38b2ac] active:text-white"
}
`}
        disabled={p === page}
        aria-current={p === page ? "page" : undefined}
      >
        {p}
      </button>
    ))}
  </div>
);

export default PaginationControl;
