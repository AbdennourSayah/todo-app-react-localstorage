import { React, useState, useEffect } from "react";

const ToDoList = () => {
  const infoCurentuser = JSON.parse(localStorage.getItem("CurentUser") || "");
  const infoUser = JSON.parse(localStorage.getItem("users"));
  const user = infoUser.find((e) => e.email === infoCurentuser.email);
  const [allTasks, setAllTasks] = useState([]);
  const [task, setTask] = useState("");

  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    setAllTasks(savedTasks);
  }, []);

  function addTask() {
    const newTask = {
      taskTitle: task,
      statue: false,
    };

    const updatedTasks = [...allTasks];
    const ownerIndex = updatedTasks.findIndex(
      (item) => item.owner === user.userName
    );

    if (ownerIndex !== -1) {
      updatedTasks[ownerIndex].tasks.push(newTask);
    } else {
      updatedTasks.push({
        owner: user.userName,
        tasks: [newTask],
      });
    }

    setAllTasks(updatedTasks);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
    setTask(""); // Clear input after add
  }

  function deleteTask(index) {
    const updatedTasks = [...allTasks];
    const ownerIndex = updatedTasks.findIndex(
      (item) => item.owner === user.userName
    );

    if (ownerIndex !== -1) {
      updatedTasks[ownerIndex].tasks.splice(index, 1);
      setAllTasks(updatedTasks);
      localStorage.setItem("tasks", JSON.stringify(updatedTasks));
    }
  }
  function taskDone(index) {
    let updateTasks = [...allTasks];
    let indexuserTasks = updateTasks.findIndex(
      (item) => item.owner == user.userName
    );
    console.log(updateTasks[indexuserTasks].tasks[index].statue);

    if (indexuserTasks !== -1) {
      updateTasks[indexuserTasks].tasks[index].statue =
        !updateTasks[indexuserTasks].tasks[index].statue;
      console.log(updateTasks[indexuserTasks].tasks[index].statue);
    }

    setAllTasks(updateTasks);
    localStorage.setItem("tasks", JSON.stringify(updateTasks));
  }
  const currentUserTasks =
    allTasks.find((item) => item.owner === user.userName)?.tasks || [];
  return (
    <div className="w-full flex flex-col gap-3 items-center justify-center">
      <div className="border-3 rounded-2xl border-[#007ba7] w-[50%] p-[30px]">
        <h1 className="text-[32px] font-bold">
          Welcome <span className="!text-[#007ba7]">{user.userName}</span>
        </h1>
        <p className="text-[#414A4C]">{user.email}</p>
      </div>

      <div className="border-2 rounded-2xl border-[#B2BEB5] w-[50%] p-[30px] grid grid-cols-[1fr_auto]">
        <input
          value={task}
          onChange={(e) => setTask(e.target.value)}
          type="text"
          className="border-[#B2BEB5] mr-4 border-3"
        />
        <button
          onClick={addTask}
          className="px-[25px] text-white rounded-[8px] ml-0.5 hover:border-[#007ba7] hover:text-[#007ba7] focus:border-[#007ba7] p-[10px]">
          Add
        </button>
      </div>

      <ul className="w-[100%] flex flex-col items-center justify-center">
        {currentUserTasks.length === 0 ? (
          <p>You have no tasks today</p>
        ) : (
          currentUserTasks.map((task, index) => (
            <li
              key={index}
              className="grid grid-cols-[1fr_auto_auto] place-items-center  gap-3 rounded-2xl border-[#007ba7] border-2 px-[50px] py-[10px] w-[40%] mb-[15px]">
              <h1 className={task.statue ? "line-through" : "none"}>
                {task.taskTitle}
              </h1>
              <button
                onClick={() => {
                  taskDone(index);
                }}
                className="px-[25px] text-white rounded-[8px] ml-0.5 hover:border-[#007ba7] hover:text-[#007ba7] p-[10px]">
                Done
              </button>
              <button
                onClick={() => deleteTask(index)}
                className="btn   px-[25px] p-[10px] text-[#e5e4e2] hover:text-[#ff0800] rounded-[8px] ml-0.5">
                Delete
              </button>
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default ToDoList;
