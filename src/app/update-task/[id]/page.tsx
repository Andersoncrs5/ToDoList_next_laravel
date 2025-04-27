'use client';

import Alert from "@/Alerts/Alert";
import Header from "@/Components/Header.component";
import TaskDto from "@/DTOs/TaskDto";
import api from "@/services/api";
import { AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import { useParams, useRouter } from 'next/navigation';
import Navigator from "@/services/Navigator";

export default function UpdateTask() {
    const { id } = useParams<{ id: string }>();
    const router = useRouter();

    const [title, setTitle] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const [done, setDone] = useState<boolean>(false);
    const [showAlert, setShowAlert] = useState<boolean>(false);
    const [msgError, setMsgError] = useState<string>('');
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

    useEffect(() => {
        async function fetchTask() {
            try {
                const res: AxiosResponse<TaskDto> = await api.get(`/${id}`);
                const task = res.data;
                setTitle(task.title || '' );
                setDescription(task.description || '' );
                setDone(task.done || false)
            } catch (error) {
                console.error(error);
                setMsgError('Error loading task.');
                setShowAlert(true);
            }
        }

        if (id) {
            fetchTask();
        }
    }, [id]);

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();

        const updatedTask: TaskDto = {
            title,
            description,
            done,
        };

        try {
            setIsSubmitting(true);
            const res: AxiosResponse = await api.put(`/${id}`, updatedTask);

            if (res.status === 200) {
                setMsgError('Task updated successfully!');
                setShowAlert(true);

                setTimeout(() => {
                    Navigator.goToHome(router);
                }, 3000);
            } else {
                throw new Error('Unexpected server response.');
            }

        } catch (error: any) {
            console.error(error);
            setMsgError(error.response?.data || 'Error updating task.');
            setShowAlert(true);
        } finally {
            setIsSubmitting(false);
        }
    }

    return (
        <div>
            <Header title="Update Task" nameBtn="Home" />

            {showAlert && <Alert name={msgError} color="green" time={3000} />}

            <div className="flex items-center justify-center min-h-screen">
                <form 
                    onSubmit={handleSubmit} 
                    className="border-2 rounded-2xl p-6 shadow-md w-full max-w-md space-y-4"
                >
                    <div className="flex flex-col">
                        <label htmlFor="title" className="mb-1 font-medium">Title</label>
                        <input 
                            type="text" 
                            id="title"
                            name="title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" 
                            placeholder="Enter the title"
                        />
                    </div>

                    <div className="flex flex-col">
                        <label htmlFor="description" className="mb-1 font-medium">Description</label>
                        <textarea 
                            id="description"
                            name="description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className="border rounded px-3 py-2 h-24 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500" 
                            placeholder="Enter the description"
                        ></textarea>
                    </div>

                    <div className="flex justify-end">
                        <button 
                            type="submit"
                            disabled={isSubmitting}
                            className={`flex items-center gap-2 bg-blue-600 border text-white px-4 py-2 rounded 
                            ${isSubmitting ? 'opacity-50 cursor-not-allowed' : 'hover:bg-black hover:border'}`}
                        >
                            {isSubmitting ? (
                                <>
                                    <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24">
                                        <circle 
                                            className="opacity-25" 
                                            cx="12" cy="12" r="10" 
                                            stroke="currentColor" 
                                            strokeWidth="4"
                                        ></circle>
                                        <path 
                                            className="opacity-75" 
                                            fill="currentColor" 
                                            d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                                        ></path>
                                    </svg>
                                    Updating...
                                </>
                            ) : (
                                'UPDATE'
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
