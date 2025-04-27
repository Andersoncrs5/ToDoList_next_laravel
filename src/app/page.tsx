'use client';
import Alert from "@/Alerts/Alert";
import ErrorGeral from "@/Components/errs/ErrorGeral.component";
import Footer from "@/Components/Foooter.component";
import Header from "@/Components/Header.component";
import Load from "@/Components/Load.component";
import Showtask from "@/Components/ShowTask.component";
import TaskDto from "@/DTOs/TaskDto";
import api from "@/services/api";
import { AxiosResponse } from "axios";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPenToSquare, faCircleCheck, faCircleXmark, faCodeCompare } from "@fortawesome/free-solid-svg-icons";
import "@/fontawesome";

export default function Home() {
  const [tasks, setTasks] = useState<TaskDto[]>([]);
  const [load, setLoad] = useState<boolean>(true);
  const [msgError, setMsgError] = useState<string>('');
  const [error, setError] = useState<boolean>(false);
  const [showAlert, setShowAlert] = useState<boolean>(false);
  const [msgAlert, setMsgAlert] = useState<string>('');
  const [colorAlert, setColorAlert] = useState<string>('');

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

  async function changeTask(id: any) {
    if (!id) {
      console.error('Error: Id is required');
      return;
    }
    const res: AxiosResponse<any, any> = await api.get(`/changeStatus/${String(id)}`);

    if (res.status === 500) {
      setMsgAlert(res.data); 
      setColorAlert('red');
      setShowAlert(true);            
      closeTheAlert(); 
    }

    if (res.status === 400) {
      setMsgAlert(res.data); 
      setColorAlert('yellow');
      setShowAlert(true);            
      closeTheAlert(); 
    }

    if (res.status === 404) {
      setMsgAlert(res.data); 
      setColorAlert('yellow');
      setShowAlert(true);            
      closeTheAlert(); 
    }

    if (res.status === 200) {
      setMsgAlert(res.data); 
      setColorAlert('green');
      setShowAlert(true);    
      getTasks();            
      closeTheAlert(); 
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
      setMsgAlert(res.data); 
      setColorAlert('red');
      setShowAlert(true);            
      closeTheAlert(); 
    }

    if (res.status === 400) {
      setMsgAlert(res.data); 
      setColorAlert('yellow');
      setShowAlert(true);            
      closeTheAlert(); 
    }

    if (res.status === 404) {
      setMsgAlert(res.data); 
      setColorAlert('yellow');
      setShowAlert(true);            
      closeTheAlert(); 
    }

    if (res.status === 200) {
      setMsgAlert(res.data); 
      setColorAlert('green');
      setShowAlert(true);    
      getTasks();            
      closeTheAlert(); 
    }

    return;
  }

  function closeTheAlert() {
    setTimeout(() => {
      setShowAlert(false);
    }, 4000);
  }

  return (
    <div className="">
      <Header title="My Tasks" urlBtn="create-task" nameBtn={'New Task'} />
      {load && <Load />}
      {error && <ErrorGeral title={msgError} />}
      {showAlert && <Alert name={msgAlert} color={colorAlert} time={4000} />}

      {
        tasks.map((e: TaskDto) => {
          return  (
            <div key={e.id} >
              <div className="grid grid-cols-4 gap-4 text-white w-[80%] my-3 p-2 border rounded text-center mx-auto " >
                <div>
                    <h3>{e.title}</h3>
                </div>
                <div>
                    <p>{e.description}</p>
                </div>
                <div>
                    {e.done? <FontAwesomeIcon icon={faCircleCheck} /> : <FontAwesomeIcon icon={faCircleXmark} /> }
                </div>
                <div>
                    <button onClick={() => deleteTask(e.id) } className="p-0.5 py-1.5 px-3 rounded border me-1 border-red-600 hover:bg-red-600 " > 
                      <FontAwesomeIcon icon={faTrash} />
                    </button>
                    <Link href={`update-task/${e.id}`} className="p-0.5 py-1.5 px-3 hover:bg-yellow-600 border rounded border-yellow-300 " > 
                      <FontAwesomeIcon icon={faPenToSquare} />
                    </Link>
                    <button
                     onClick={() => changeTask(e.id) }
                     className="p-0.5 py-1.5 ms-1 px-3 rounded border me-1 border-blue-600 hover:bg-blue-600 " >
                      <FontAwesomeIcon icon={faCodeCompare} />
                    </button>
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
