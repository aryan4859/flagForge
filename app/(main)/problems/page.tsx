"use client";
import React, { useState, useEffect } from "react";
import QustionCards from "@/components/QustionCards";
import Loading from "@/components/loading";
import AuthError from "@/components/authError";
import { IoFilter } from "react-icons/io5";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { Questions } from "@/interfaces";

const page = () => {
  const { status: sessionStatus } = useSession();
  const [open, setOpen] = useState<boolean>(false);
  const [problems, setProblems] = useState<Questions[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const fetchProblems = async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/problems?page=${currentPage}`);
      if (!response.ok) {
        throw new Error("Failed to fetch problems");
      }
      const data = await response.json();
      setProblems(data.data);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchProblems();
  }, [currentPage]);
  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };

  if (loading) {
    return <Loading />;
  }
  if (sessionStatus === "loading") {
    return <Loading />;
  }

  if (sessionStatus === "unauthenticated") {
    return <AuthError />;
  }
  const handleMenuClick: () => void = () => {
    setOpen(!open);
  };
  return (
    <div className="flex h-auto flex-col justify-center items-center mt-[14vh] gap-[5rem]  sm:gap-[4rem]">
      <div className="absolute circlePosition w-screen sm:w-[590px] h-[400px] bg-gradient-to-r from-rose-500 rounded-[100%] top-[50%] left-[50%]  blur-[90px] translate-x-[-50%] translate-y-[-50%] z-[-1]" />
      <h1 className="text-4xl sm:text-5xl text-center  text-rose-500 font-bold">
        Challenges
      </h1>
      <div
        className="flex justify-between w-[76%] cursor-pointer sm:hidden"
        onClick={handleMenuClick}
      >
        <h2 className="text-center text-xl sm:text-xl font-medium text-gray-600">
          Score : <span className="text-rose-500 font-extrabold">10000</span>
        </h2>
        <div className="flex gap-2 items-center justify-center text-center text-xl sm:hidden font-medium text-gray-600">
          <IoFilter className="text-2xl" />
        </div>
      </div>
      <div
        className={
          open
            ? "absolute top-[0px] sm:hidden left-0 h-screen  w-[300px] flex flex-col gap-3 justify-center items-center  backdrop-blur-[150px] rounded-2xl transition-all duration-900 shadow-lg z-[101]"
            : "absolute top-[0px] sm:hidden left-[-100%] h-screen w-[300px] flex flex-col gap-3 justify-center items-center  backdrop-blur-[1px] rounded-2xl transition-all duration-900 shadow-lg z-[101]"
        }
      >
        <div className="text-2xl font-bold flex gap-2 items-center text-center ">
          <IoFilter />
          Filters
        </div>
        <div className="flex flex-col gap-2">
          <h1 className="font-bold text-lg">Topics</h1>
          <ul className="flex flex-col gap-3 font-base">
            <li className="shadow p-3 rounded-md hover:text-rose-500 hover:font-bold hover:bg-rose-100 cursor-pointer">
              All
            </li>
            <li className="shadow p-3 rounded-md hover:text-rose-500 hover:font-bold hover:bg-rose-100 cursor-pointer">
              Web Exploitation
            </li>
            <li className="shadow p-3 rounded-md hover:text-rose-500 hover:font-bold hover:bg-rose-100 cursor-pointer">
              Cryptography
            </li>
            <li className="shadow p-3 rounded-md hover:text-rose-500 hover:font-bold hover:bg-rose-100 cursor-pointer">
              Reverse Engineering
            </li>
            <li className="shadow p-3 rounded-md hover:text-rose-500 hover:font-bold hover:bg-rose-100 cursor-pointer">
              Forensics
            </li>
            <li className="shadow p-3 rounded-md hover:text-rose-500 hover:font-bold hover:bg-rose-100 cursor-pointer">
              General Skills
            </li>
            <li className="shadow p-3 rounded-md hover:text-rose-500 hover:font-bold hover:bg-rose-100 cursor-pointer">
              Binary Exploitation
            </li>
          </ul>
        </div>
      </div>
      <div className="w-[90%] mx-auto my-0 flex justify-between">
        <div className="w-[20%] h-[70vh] shadow-xl p-6 rounded-xl sm:flex flex-col gap-[36px] hidden">
          <div className="text-2xl font-bold flex gap-2 items-center text-center ml-12">
            <IoFilter />
            Filters
          </div>
          <div className="flex flex-col gap-2">
            <h1 className="font-bold text-lg">Topics</h1>
            <ul className="flex flex-col gap-2 font-base">
              <li className="shadow p-3 rounded-md hover:text-rose-500 hover:font-bold hover:bg-gray-100 cursor-pointer">
                All
              </li>
              <li className="shadow p-3 rounded-md hover:text-rose-500 hover:font-bold hover:bg-gray-100 cursor-pointer">
                Web Exploitation
              </li>
              <li className="shadow p-3 rounded-md hover:text-rose-500 hover:font-bold hover:bg-gray-100 cursor-pointer">
                Cryptography
              </li>
              <li className="shadow p-3 rounded-md hover:text-rose-500 hover:font-bold hover:bg-gray-100 cursor-pointer">
                Reverse Engineering
              </li>
              <li className="shadow p-3 rounded-md hover:text-rose-500 hover:font-bold hover:bg-gray-100 cursor-pointer">
                Forensics
              </li>
              <li className="shadow p-3 rounded-md hover:text-rose-500 hover:font-bold hover:bg-gray-100 cursor-pointer">
                General Skills
              </li>
              <li className="shadow p-3 rounded-md hover:text-rose-500 hover:font-bold hover:bg-gray-100 cursor-pointer">
                Binary Exploitation
              </li>
            </ul>
          </div>
        </div>

        <div className="w-[90%] sm:w-[70%] mx-auto my-0 flex justify-center items-center flex-wrap gap-x-[5px] gap-y-[30px]">
          {problems.map(
            ({ title, category, points, description, _id }: Questions) => (
              <QustionCards
                key={title}
                title={title}
                category={category}
                points={points}
                description={description.substring(0, 95)}
                _id={_id}
              />
            )
          )}
        </div>
      </div>
      <div className="w-[80%] sm:w-[60%] sm:ml-[270px] flex justify-between">
        <button
          onClick={handlePrevPage}
          disabled={currentPage === 1}
          className="bg-rose-500 hover:bg-rose-800 shadow-xl font-medium text-base rounded-xl px-4 py-2 text-white"
        >
          Previous
        </button>
        <button
          onClick={handleNextPage}
          className="bg-rose-500 hover:bg-rose-800 shadow-xl font-medium text-base rounded-xl px-[1.1rem] py-3 text-white"
        >
          Next
        </button>
      </div>
      <div className="w-[85%] border-b-4 border-gray-200"></div>
    </div>
  );
};

export default page;
