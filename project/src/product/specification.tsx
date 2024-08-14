import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { getRequest } from "../utils/handleApi";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { specifics } from "../utils/schema2";

function Specification() {
  const [search] = useSearchParams();
  const [specifics, setSpecifics] = useState<specifics>();
  const id = search.get("id");
  useEffect(() => {
    const fetchData = async () => {
      const data = await getRequest(`specifics/${id}`);
      if (data?.err) {
        toast.error("Product not found");
        return;
      }
      setSpecifics(data);
    };
    fetchData();
  }, [search]);
  return (
    <div className="px-10 py-5 space-y-10 max-sm:px-4 max-sm:py-6">
      <ToastContainer />
      {specifics?.details &&
        [...specifics?.details].map((s, i) => (
          <p className="max-sm:p-2" key={i}>
            {s}
          </p>
        ))}
      <p className="max-sm:p-2">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus quaerat
        reprehenderit, natus possimus commodi provident repellendus perspiciatis
        temporibus nisi rerum obcaecati ipsum debitis incidunt dolores id ipsa
        in facilis ex. Lorem ipsum dolor sit, amet consectetur adipisicing elit.
        Qui, expedita iure. Tempora deleniti illum quia minima quas voluptate
        odit sequi consequatur, facere dolorem maiores, mollitia facilis iste?
        Recusandae, maiores amet. Lorem ipsum dolor, sit amet consectetur
        adipisicing elit. Sed cumque sunt, hic asperiores eius odio vel modi
        distinctio amet aspernatur vero ex quidem sequi, accusamus dicta
        debitis! Amet, reprehenderit qui?
      </p>
      <div className="w-full h-[25rem] max-sm:h-[20rem] rounded-md bg-slate-100"></div>
      <p className="max-sm:p-2">
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolorum magni
        nesciunt quae porro, inventore, praesentium a fuga labore corporis quas
        et necessitatibus aliquid ab nostrum excepturi quasi? Aspernatur,
        consectetur voluptatum! Lorem ipsum dolor sit amet consectetur
        adipisicing elit. Dignissimos vitae aliquid magni, doloribus, vel
        necessitatibus magnam laborum quos nemo repellat doloremque sit, animi
        error? Exercitationem sint vel cum tenetur nihil! Lorem ipsum dolor, sit
        amet consectetur adipisicing elit. Voluptates odit blanditiis placeat
        possimus cum nulla doloribus ipsum dolor fugiat quos alias eius,
        repudiandae consequuntur molestiae consequatur, sapiente perferendis
        unde tempore? Lorem ipsum dolor sit, amet consectetur adipisicing elit.
        Velit iste, non error autem quas accusantium officia minima facere,
        esse, earum ex nihil accusamus nulla ut consequuntur perspiciatis animi
        ullam excepturi.
      </p>
      <p className="max-sm:p-2">
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolorum magni
        nesciunt quae porro, inventore, praesentium a fuga labore corporis quas
        et necessitatibus aliquid ab nostrum excepturi quasi? Aspernatur,
        consectetur voluptatum! Lorem ipsum dolor sit amet consectetur
        adipisicing elit. Dignissimos vitae aliquid magni, doloribus, vel
        necessitatibus magnam laborum quos nemo repellat doloremque sit, animi
        error? Exercitationem sint vel cum tenetur nihil! Lorem ipsum dolor, sit
        amet consectetur adipisicing elit. Voluptates odit blanditiis placeat
        possimus cum nulla doloribus ipsum dolor fugiat quos alias eius,
        repudiandae consequuntur molestiae consequatur, sapiente perferendis
        unde tempore? Lorem ipsum dolor sit, amet consectetur adipisicing elit.
        Velit iste, non error autem quas accusantium officia minima facere,
        esse, earum ex nihil accusamus nulla ut consequuntur perspiciatis animi
        ullam excepturi. Exercitationem sint vel cum tenetur nihil! Lorem ipsum
        dolor, sit amet consectetur adipisicing elit. Voluptates odit blanditiis
        placeat possimus cum nulla doloribus ipsum dolor fugiat quos alias eius,
        repudiandae consequuntur molestiae consequatur, sapiente perferendis
        unde tempore? Lorem ipsum dolor sit, amet consectetur adipisicing elit.
        Velit iste, non error autem quas accusantium officia minima facere,
        esse, earum ex nihil accusamus nulla ut consequuntur perspiciatis animi
        ullam excepturi.
      </p>
    </div>
  );
}

export default Specification;
