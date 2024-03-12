
import { useForm } from 'react-hook-form';
import useAxios from '../hooks/useAxios';
import Swal from 'sweetalert2';
import { useContext } from 'react';
import { AuthContext } from '../authentications/providers/AuthProvider';

function SubmitButton() {
  return (
    <button
      type="submit"
      className="inline-flex h-7 md:h-10 w-full items-center justify-center gap-2 whitespace-nowrap rounded bg-sky-500 px-2 md:px-5 text-sm font-medium tracking-wide text-white transition duration-300 hover:bg-sky-600 focus:bg-sky-700 focus-visible:outline-none disabled:cursor-not-allowed disabled:border-sky-300 disabled:bg-sky-300 disabled:shadow-none"
    >
      <span>Add Task</span>
    </button>
  );
}

const AddTask = () => {
  const { user } = useContext(AuthContext);
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
  const axios = useAxios();

  const onSubmit = (data) => {
    // console.log(data);
    const payload = {
      ...data,
      email: user?.email
    }
    // console.log(payload);
    axios.post("/add-task", payload)
      .then(() => {
        // console.log(res);
        
        Toast.fire({
          icon: "success",
          title: "Task Added"
        });
      })
      .catch(() => {
        // console.log(err);
        Toast.fire({
          icon: "error",
          title: "Failed to add Task"
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
            Create Task
          </h3>
        </header>
        {/* register your input into the hook by invoking the "register" function */}
        <input
          type="text"
          placeholder="Task Title"
          {...register("title", { required: true })}
          className="border-2 w-full rounded-lg px-2 text-sm font-light py-2"
        />
        {errors.title && (
          <span className="text-sm text-red-300 font-light">
            Title is required
          </span>
        )}
        <select {...register("priority")}
          className="border-2 rounded-lg w-full px-2 text-sm font-light py-2"

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
          placeholder="Deadline"
          {...register("deadline", { required: true })}
          className="border-2 w-full rounded-lg px-2 text-sm font-light py-2"
        />
        {errors.deadline && (
          <span className="text-sm text-red-300 font-light">
            This field is required
          </span>
        )}
        <textarea 
          name="description" 
          id="description" 
          cols="30" 
          rows="5"
          placeholder="Description"
          {...register("description", { required: true })}
          className="border-2 w-full rounded-lg px-2 text-sm font-light py-2"
        
        ></textarea>
       
        {errors.description && (
          <span className="text-sm text-red-300 font-light">
            Description is required
          </span>
        )}
       

        <div className="flex justify-end pb-6 ">
          <SubmitButton></SubmitButton>
        </div>
      </form>
    </main>
  );
};

export default AddTask;