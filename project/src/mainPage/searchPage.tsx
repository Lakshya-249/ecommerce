import SearchTemplate from "../Models/searchTemplate";
import SearchFilterModal from "../Models/searchFilterModal";
// import { useState } from "react";

function SearchPage() {
  // const [showFilter, setShow] = useState<boolean>(true);
  return (
    <div className="flex pt-24 px-12 max-sm:px-2 max-sm:py-20 w-full h-screen text-left text-white">
      <div className="w-[25%] px-8 max-sm:hidden">
        <SearchFilterModal setShow={undefined} />
      </div>
      <div className="w-full overflow-auto example h-full px-10 max-sm:px-0">
        <SearchTemplate />
      </div>
    </div>
  );
}

export default SearchPage;
