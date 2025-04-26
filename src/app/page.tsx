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

  return (
    <div className="">
      <Header title="My Tasks" urlBtn="create-task" nameBtn={'New Task'} />
      {load && <Load />}
      {error && <ErrorGeral title={msgError} />}

      {
        tasks.map((e: TaskDto) => {
          return  (<Showtask task={e} />);
        } )
      }
      <Footer />
    </div>
  );
}
