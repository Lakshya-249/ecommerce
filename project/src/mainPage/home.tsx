import { useEffect, useMemo, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import ItemModelList from "../Models/itemModelList";
import { faCircleCheck } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import ItemModelList2 from "../Models/itemModelList2";

function Home() {
  const array: Array<string> = [
    "All",
    "Decor",
    "Garments",
    "Electronics",
    "Sneakers",
  ];
  const arr: string[] = [
    "https://images.unsplash.com/photo-1586689311267-e88bb0509995?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1542598953-41310c43f54b?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1485218126466-34e6392ec754?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1567016432779-094069958ea5?q=80&w=1780&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://plus.unsplash.com/premium_photo-1680985551009-05107cd2752c?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  ];
  const [item, setItems] = useState<string>(arr[0]);
  const [pointer, setPointer] = useState<number>(0);
  const [category, setCategory] = useState<string>(array[0].toLowerCase());
  const navigate = useNavigate();
  const handlePointer = (ind: number, val: string) => {
    setPointer(ind);
    setCategory(val.toLowerCase());
    navigate(`/?id=${val}`);
  };
  const func = useMemo(() => {
    function* f(array: string[]): Generator<string, void, string> {
      let i = 0;
      while (true) {
        //   yield array[i];
        const incOrDec = (yield array[i]) === "prev" ? -1 : 1;
        i = (array.length + i + incOrDec) % array.length;
      }
    }
    return f(arr);
  }, []);

  useEffect(() => {
    const showslides = () => {
      setItems(func.next().value as string);
      setTimeout(showslides, 10000);
    };

    showslides();
  }, []);

  const handleClick = (val: string) => {
    if (val === "prev") {
      setItems(func.next("prev").value as string);
    } else {
      setItems(func.next().value as string);
    }
  };
  const win = window.matchMedia("{max-width:640px}");
  console.log(win.matches);

  return (
    <div className="w-full text-white h-full bg-inherit">
      <div className="relative w-full h-[48rem] max-sm:h-[34rem]">
        <div className="absolute z-0 top-0 left-0 w-full h-screen max-sm:h-full">
          <img className=" object-cover w-full h-full" src={item} />
        </div>
        <div
          className="w-full h-full flex flex-col justify-end backdrop-blur-3xl 
          bg-gradient-to-b from-black/25 to-black/80 max-sm:to-black space-y-5"
        >
          <div
            className="flex *:px-4 *:py-2.5 px-8 *:rounded-xl 
          overflow-auto example bg-inherit font-semibold space-x-3"
          >
            {array.map((val, i) => (
              <p
                onClick={() => handlePointer(i, val)}
                key={i}
                className={`${
                  i == pointer ? "bg-transparent/10" : ""
                } hover:cursor-pointer`}
              >
                {val}
              </p>
            ))}
          </div>
          <div className="w-full h-[38rem] max-sm:h-[25rem] flex">
            <div
              onClick={() => handleClick("prev")}
              className="h-full flex items-center px-1 hover:bg-transparent/30 mx-1 rounded-md hover:cursor-pointer"
            >
              <FontAwesomeIcon icon={faChevronLeft} size="xl" />
            </div>
            <div className="relative w-full h-full flex rounded-2xl overflow-hidden">
              <img
                className="object-cover w-full h-full hover:transform 
    hover:scale-110 transition-transform ease-in-out duration-200"
                src={item}
              />
              <div
                className="absolute bottom-0 left-0 text-left space-y-3 
              bg-transparent w-full max-sm:px-7 px-10 py-12"
              >
                <p className="text-5xl max-sm:text-4xl font-semibold">
                  Best deals on products & cutomers
                </p>
                <div className="w-full flex justify-between">
                  <p className="text-xl font-semibold">
                    By ecomm <FontAwesomeIcon icon={faCircleCheck} />
                  </p>
                  <button className="rounded-xl max-sm:hidden text-[1.1rem] max-sm:p-2.5 font-semibold backdrop-blur-xl bg-black/20 p-6 hover:bg-gray-400/10 hover:text-black">
                    View collection
                  </button>
                </div>
              </div>
            </div>
            <div
              onClick={() => handleClick("next")}
              className="h-full flex items-center px-1 hover:bg-transparent/30 mx-1 rounded-md hover:cursor-pointer"
            >
              <FontAwesomeIcon icon={faChevronRight} size="xl" />
            </div>
          </div>
        </div>
      </div>
      <div className="py-14 bg-gradient-to-t from-black/25 to-black/70 max-sm:to-black space-y-12">
        {category === "all" ? (
          <>
            <ItemModelList item="Electronics" />
            <ItemModelList item="Cloths" />
            <ItemModelList item="Furniture" />
          </>
        ) : (
          <ItemModelList2 item={category} />
        )}
      </div>
    </div>
  );
}

export default Home;
