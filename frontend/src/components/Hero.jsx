import { BookDashed } from "lucide-react";
import { useAuth } from "../context/AuthContext";

const Hero = () => {
  const { user } = useAuth();
  return (
    <div
      className="bg-gray-100 md:w-full -z-10 md:pt-26
      text-center pb-10 m-2 md:m-0 rounded-md flex flex-col items-center justify-start gap-8 p-2 border border-gray-300 shadow"
    >
      <span className="border-2 items-center gap-2 text-gray-700 bg-white  px-4 border-gray-300 rounded-md inline-flex p-1">
        <BookDashed size={16} />
        Blog
      </span>
      {/* Title  */}
      <h1 className="text-5xl font-bold ">
        {"Hello " + user?.name + " !" || "Insight and Updates"}
      </h1>
      {/* Paragraph  */}
      <p className="   ">
        A collection of hand picked articles for freelancers, by
        freelancers.Deep dives,insights, and honest advice to navigate the
        freelance landscape.
      </p>
    </div>
  );
};

export default Hero;
