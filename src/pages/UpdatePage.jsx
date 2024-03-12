import{ useParams} from 'react-router-dom';
import Swal from 'sweetalert2';
import { useForm } from 'react-hook-form';
import useAxios from '../hooks/useAxios';
import { useState } from 'react';
import { useEffect } from 'react';

function SubmitButton() {
  return (
    <button
      type="submit"
      className="inline-flex h-7 md:h-10 w-full items-center justify-center gap-2 whitespace-nowrap rounded bg-sky-500 px-2 md:px-5 text-sm font-medium tracking-wide text-white transition duration-300 hover:bg-sky-600 focus:bg-sky-700 focus-visible:outline-none disabled:cursor-not-allowed disabled:border-sky-300 disabled:bg-sky-300 disabled:shadow-none"
    >
      <span>Update</span>
    </button>
  );
}

const UpdatePage = () => {
  const { id }= useParams();
  // console.log(id);
  // const { user } = useContext(AuthContext);
  const [task, setTask] = useState({});
  const axios = useAxios();

  useEffect(() => {
    axios.get(`/findTask/${id}`)
      .then(res => setTask(res?.data[0]))
  }, [axios, id])
  
  // console.log(task);
  const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.onmouseenter = Swal.stopTimer;
      toast.onmouseleave = Swal.resumeTimer;
    }
  });

  const {
    register,
    handleSubmit,
    // watch,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    // console.log(data);
    axios.patch(`/update-task/${id}`, data)
    .then(() => {
      // console.log(res);
      
      Toast.fire({
        icon: "success",
        title: "Task Updated"
      });
    })
    .catch(() => {
      // console.log(err);
      Toast.fire({
        icon: "error",
        title: "Failed to update"
      });
    }) 
  };


  return (
    <main className="min-h-screen">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col justify-center items-center space-y-4  overflow-hidden rounded bg-white text-slate-500 max-w-2xl p-5 mx-auto"
      >
        <header className="mb-4 text-center">
          <h3 className="text-xl font-medium text-slate-700">
            Update Task
          </h3>
        </header>
        {/* register your input into the hook by invoking the "register" function */}
        <input
          type="text"
          defaultValue={task?.title}
          {...register("title", { required: true })}
          className="border-2 w-full rounded-lg px-2 text-sm font-light py-2"
        />
        
        <select {...register("priority")}
          className="border-2 rounded-lg w-full px-2 text-sm font-light py-2"
          defaultValue={task?.priority}
        >
          <option value="" disabled>Select Priority</option>
          <option value="high">High</option>
          <option value="medium">Medium</option>
          <option value="low">Low</option>
        </select>
        {errors.priority && (
          <span className="text-sm text-red-300 font-light">
            This field is required
          </span>
        )}

        <input
          type="date"
          defaultValue={task?.deadline}
          {...register("deadline", { required: true })}
          className="border-2 w-full rounded-lg px-2 text-sm font-light py-2"
        />
        
        <textarea 
          name="description" 
          id="description" 
          cols="30" 
          rows="5"
          defaultValue={task?.description}
          {...register("description", { required: true })}
          className="border-2 w-full rounded-lg px-2 text-sm font-light py-2"
          
        ></textarea>
       
        
       

        <div className="flex justify-end pb-6 ">
          <SubmitButton></SubmitButton>
        </div>
      </form>
    </main>
  );
};

export default UpdatePage;