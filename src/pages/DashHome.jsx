import { NavLink } from "react-router-dom";
import useAxios from "../hooks/useAxios";
import { useEffect } from "react";
import { useState } from "react";
import { useContext } from "react";
import { AuthContext } from "../authentications/providers/AuthProvider";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import _ from "lodash";
import "./DashHome.css";

function AddTaskBtn() {
  return (
    <div className="text-center">
      <NavLink to="/dashboard/addTask">
        <button className="inline-flex h-10  items-center justify-center gap-2 whitespace-nowrap rounded bg-blue-500 px-5 text-sm font-medium tracking-wide text-white transition duration-300 hover:bg-sky-600 focus:bg-sky-700 focus-visible:outline-none disabled:cursor-not-allowed disabled:border-sky-300 disabled:bg-sky-300 disabled:shadow-none">
          <span>Add New Task</span>
        </button>
      </NavLink>
    </div>
  );
}

function EditTaskBtn() {
  return (
    <div className="text-center">
      <NavLink to="/dashboard/editTask">
        <button className="inline-flex h-10  items-center justify-center gap-2 whitespace-nowrap rounded bg-sky-500 px-5 text-sm font-medium tracking-wide text-white transition duration-300 hover:bg-sky-600 focus:bg-sky-700 focus-visible:outline-none disabled:cursor-not-allowed disabled:border-sky-300 disabled:bg-sky-300 disabled:shadow-none">
          <span>Edit Task</span>
        </button>
      </NavLink>
    </div>
  );
}

function DeleteTaskBtn() {
  return (
    <div className="text-center">
      <NavLink to="/dashboard/editTask">
        <button className="inline-flex h-10  items-center justify-center gap-2 whitespace-nowrap rounded bg-red-500 px-5 text-sm font-medium tracking-wide text-white transition duration-300 hover:bg-sky-600 focus:bg-sky-700 focus-visible:outline-none disabled:cursor-not-allowed disabled:border-sky-300 disabled:bg-sky-300 disabled:shadow-none">
          <span>Delete Task</span>
        </button>
      </NavLink>
    </div>
  );
}

const DashHome = () => {
  const axios = useAxios();
  const { user } = useContext(AuthContext);
  const [state, setState] = useState({});

  useEffect(() => {
    axios.get(`/userTasks/${user?.email}`).then((res) => {
      setState({
        todo: {
          title: "Todo",
          items: res?.data,
        },
        "in-progress": {
          title: "Ongoing",
          items: [],
        },
        done: {
          title: "Completed",
          items: [],
        },
      });
    });
  }, [axios, user?.email]);

  // console.log(tasks);

  const handleDragEnd = ({ destination, source }) => {
    if (!destination) {
      return;
    }

    if (
      destination.index === source.index &&
      destination.droppableId === source.droppableId
    ) {
      return;
    }

    // Creating a copy of item before removing it from state
    const itemCopy = { ...state[source.droppableId].items[source.index] };

    setState((prev) => {
      prev = { ...prev };
      // Remove from previous items array
      prev[source.droppableId].items.splice(source.index, 1);

      // Adding to new items array location
      prev[destination.droppableId].items.splice(
        destination.index,
        0,
        itemCopy
      );

      return prev;
    });
  };

  return (
    <main className="lg:ml-10">
      
      <div className="flex flex-col md:flex-row gap-2 justify-start  items-center">
        <EditTaskBtn />
        <AddTaskBtn/>
        <DeleteTaskBtn/>
      </div>
      <div className="App mt-5 flex flex-col gap-2 md:flex-row w-full mb-10 justify-start items-center">
        <DragDropContext onDragEnd={handleDragEnd}>
          {_.map(state, (data, key) => {
            return (
              <div key={key} className="w-48 md:w-32 lg:w-fit lg: border-2 p-2 rounded">
                <h3 className="font-bold text-center border-b-2">
                  {data?.title}{" "}
                </h3>
                <Droppable droppableId={key}>
                  {(provided) => {
                    return (
                      <div
                        key={key}
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                        className={"droppable-col"}
                      >
                        {data.items.map((el, index) => {
                          return (
                            <Draggable
                              key={el._id}
                              index={index}
                              draggableId={el._id}
                            >
                              {(provided, snapshot) => {
                                // console.log(snapshot);
                                return (
                                  <div
                                    className={`item ${
                                      snapshot.isDragging && "dragging"
                                    }`}
                                    ref={provided.innerRef}
                                    {...provided.draggableProps}
                                    {...provided.dragHandleProps}
                                  >
                                    <h3>{el?.title}</h3>
                                    <hr />
                                    <div className="flex justify-between ">
                                      <h3>{el?.priority}</h3>
                                      <h3 className="hidden lg:block">{el?.deadline}</h3>
                                    </div>
                                  </div>
                                );
                              }}
                            </Draggable>
                          );
                        })}
                        {provided.placeholder}
                      </div>
                    );
                  }}
                </Droppable>
              </div>
            );
          })}
        </DragDropContext>
      </div>
    </main>
  );
};

export default DashHome;
