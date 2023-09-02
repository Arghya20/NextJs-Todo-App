"use client";
import React, { useEffect, useState } from "react";

const page = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [mianTask, setMainTask] = useState([]);

  const handleButtonClick = () => {
    if (navigator.vibrate) {
      navigator.vibrate(5);
    }
  };

  useEffect(() => {
    const savedTasks = localStorage.getItem("tasks");
    if (savedTasks) {
      setMainTask(JSON.parse(savedTasks));
    }
  }, []);

  const submitHandler = (e) => {
    e.preventDefault();
    const newTask = { title, description };
    const updatedTasks = [...mianTask, newTask];
    setMainTask(updatedTasks);
    setTitle("");
    setDescription("");

    // Save the updated tasks to localStorage
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
  };

  const deleteTask = (id) => {
    let copyTask = [...mianTask];
    copyTask.splice(id, 1);
    setMainTask(copyTask);

    // Save the updated tasks to localStorage
    localStorage.setItem("tasks", JSON.stringify(copyTask));
  };

  return (
    <div>
      <h2 className="bg-gray-800 p-8 text-white font-bold text-4xl text-center">
        Todo-App
      </h2>
      <div className="flex justify-center">
        <form
          onSubmit={submitHandler}
          className="m-10 flex flex-col md:flex-row justify-center items-center w-full"
        >
          <input
            required={true}
            placeholder="Title"
            className="bg-gray-100 p-2 rounded-md border-2 focus:bg-sky-100"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <input
            placeholder="Description"
            className="bg-gray-100 p-2 rounded-md border-2 focus:bg-sky-100 md:ml-6 mt-4 md:mt-0"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <button
            onClick={handleButtonClick}
            className="bg-gray-800 px-8 py-[10px] mt-4 md:mt-0 md:ml-8 rounded-md text-white font-bold"
          >
            Add
          </button>
        </form>
      </div>
      {mianTask.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 m-10 ">
          {mianTask.map((item, id) => (
            <div
              key={id}
              className="bg-gray-100 p-10 rounded-md shado flex flex-col shadow hover:ring-4 hover:ring-gray-200"
            >
              <div>
                <h2 className="text-2xl font-bold">{item.title}</h2>
                <h2 className="text-sm text-gray-400 mt-2">
                  {item.description}
                </h2>
              </div>
              <div className="flex justify-end ">
                <span
                  className="cursor-pointer p-2 rounded-full hover:bg-white "
                  onClick={(handleButtonClick, () => deleteTask(id))}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    x="0px"
                    y="0px"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                  >
                    <path d="M 10 2 L 9 3 L 3 3 L 3 5 L 21 5 L 21 3 L 15 3 L 14 2 L 10 2 z M 4.3652344 7 L 5.8925781 20.263672 C 6.0245781 21.253672 6.877 22 7.875 22 L 16.123047 22 C 17.121047 22 17.974422 21.254859 18.107422 20.255859 L 19.634766 7 L 4.3652344 7 z"></path>
                  </svg>
                </span>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex justify-center w-full mt-20">
          <h2 className="text-4xl font-bold text-gray-300">No Todo Added</h2>
        </div>
      )}
    </div>
  );
};

export default page;
