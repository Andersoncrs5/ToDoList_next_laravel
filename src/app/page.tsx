'use client';
import ErrorGeral from "@/Components/errs/ErrorGeral.component";
import Footer from "@/Components/Foooter.component";
import Header from "@/Components/Header.component";
import Load from "@/Components/Load.component";
import Showtask from "@/Components/ShowTask.component";
import TaskDto from "@/DTOs/TaskDto";
import api from "@/services/api";
import { AxiosResponse } from "axios";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function Home() {
  const [tasks, setTasks] = useState<TaskDto[]>([]);
  const [load, setLoad] = useState<boolean>(true);
  const [msgError, setMsgError] = useState<string>('');
  const [error, setError] = useState<boolean>(false);

  useEffect(()=> {
    getTasks();
  }, []);

  async function getTasks(){
    const res: AxiosResponse<any, any> = await api.get<TaskDto>('/');
    console.log(res.data);

    if (res.status == 200) {
      setTasks(res.data);
      setLoad(false);
    }

    if (res.status == 500) {
      setMsgError(res.data)
      setError(true);
    }

  }

  async function deleteTask(id: any){
    if (!id) {
      console.error('Error: Id is required');
      return;
    }

    id = String(id);

    const res: AxiosResponse<any, any> = await api.delete(`/${id}`);

    if (res.status === 500) {
        
    }

    if (res.status === 400) {
        
    }

    if (res.status === 404) {
        
    }

    if (res.status == 200) {
      getTasks();
    }

    return;
  }

  return (
    <div className="">
      <Header title="My Tasks" urlBtn="create-task" nameBtn={'New Task'} />
      {load && <Load />}
      {error && <ErrorGeral title={msgError} />}

      {
        tasks.map((e: TaskDto) => {
          return  (
            <div key={e.id} >
              <div className="grid grid-cols-3 gap-4 text-white w-[80%] my-3 p-2 border rounded text-center mx-auto " >
                <div>
                    <h3>{e.title}</h3>
                </div>
                <div>
                    <p>{e.description}</p>
                </div>
                <div>
                    <button onClick={() => deleteTask(e.id) } className="p-0.5 px-3 rounded border me-1 border-red-600 hover:bg-red-600 " > DELETE </button>
                    <button className="p-0.5 px-3 hover:bg-yellow-600 border rounded border-yellow-300 " > UPDATE </button>
                </div>
            </div>
            </div>
        );
        } )
      }
      <Footer />
    </div>
  );
}
