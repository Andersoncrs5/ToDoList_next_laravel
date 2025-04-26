'use client';
import Alert from "@/Alerts/Alert";
import Header from "@/Components/Header.component";
import TaskDto from "@/DTOs/TaskDto";
import api from "@/services/api";
import { AxiosResponse } from "axios";
import { useState } from "react";
import { useRouter } from 'next/navigation';
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import Navigator from "@/services/Navigator";


export default function CreateTask() {
    const [title, setTitle] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const [msgError, setMsgError] = useState<string>('');
    const [task, setTask] = useState<TaskDto>();
    const [showAlert, setShowAlert] = useState<boolean>(false);
    const router: AppRouterInstance = useRouter();


    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();

        const task: TaskDto = {
            title,
            description,
            done: false
        }

        const res: AxiosResponse<any, any> = await api.post('/', task);
        console.log(res);

        if (res.status === 500) {
            console.error(res.data);
            alert('Error the create task')
            ClearInputs();
        }

        if (res.status === 201) {
            setShowAlert(true); 
            setMsgError(res.data);
            ClearInputs();

            setTimeout(() => {
                Navigator.goToHome(router);
            }, 4100);
        }
    }

    async function ClearInputs() {
        setTitle('');       
        setDescription('');
    }

    return (
        <div>
            <Header title="Create new Task" nameBtn={'Home'} />

            {showAlert && <Alert name={msgError} color="green" time={4000} />}

            <div className="flex items-center justify-center min-h-screen ">
                <form onSubmit={handleSubmit} className="border-2 rounded-2xl p-6 shadow-md w-full max-w-md space-y-4">
                    
                    <div className="flex flex-col">
                        <label htmlFor="title" className="mb-1 font-medium">Title</label>
                        <input 
                            type="text" 
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" 
                            name="title" 
                            id="title" 
                        />
                    </div>

                    <div className="flex flex-col">
                        <label htmlFor="description" className="mb-1 font-medium">Description</label>
                        <textarea 
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className="border rounded px-3 py-2 h-24 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500" 
                            name="description" 
                            id="description"
                        ></textarea>
                    </div>

                    <div className="flex justify-end">
                        <input 
                            type="submit" 
                            value="SUBMIT" 
                            className="bg-green-600 border text-white px-4 py-2 rounded hover:bg-black hover:border cursor-pointer"
                        />
                    </div>
                </form>
            </div>
        </div>
    );
}
