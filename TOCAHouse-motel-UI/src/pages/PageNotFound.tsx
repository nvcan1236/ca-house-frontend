import { Link } from "react-router-dom";

const PageNotFound = ({ message }: { message: string }) => {
  return (
    <div className="h-screen flex flex-col items-center justify-center ">
      <p className="text-4xl font-bold text-gray-600">
        {message ? message : "404 - Page Not Found"}
      </p>
      <p className="text-xl mt-6 text-gray-800">
        Trở về{" "}
        <Link to={"/"} className="underline">
          trang chủ
        </Link>{" "}
      </p>
    </div>
  );
};

export default PageNotFound;
