import Signintemplate from "./signin";

const Signin = () => {
  return (
    <div className="absolute z-50 bg-[#1a1a1a] text-white flex flex-wrap w-full h-full max-sm:space-y-0">
      <div className="w-[45%] max-sm:hidden text-left h-full p-10 bg-[url('./assets/photo.avif')] bg-cover bg-no-repeat">
        <h1 className="text-white font-[Forte] text-[1.8rem] mb-8 font-light">
          e-comm
        </h1>
      </div>
      <div className="flex justify-end w-[55%] max-sm:w-full max-sm:h-auto h-full px-5 py-5">
        <Signintemplate />
      </div>
    </div>
  );
};

export default Signin;
