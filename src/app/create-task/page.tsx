'use client';

import Alert from "@/Alerts/Alert";
import Header from "@/Components/Header.component";
import TaskDto from "@/DTOs/TaskDto";
import api from "@/services/api";
import { AxiosResponse } from "axios";
import { useState } from "react";
import { useRouter } from 'next/navigation';
import Navigator from "@/services/Navigator";

export default function CreateTask() {
    const [title, setTitle] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const [msgError, setMsgError] = useState<string>('');
    const [showAlert, setShowAlert] = useState<boolean>(false);
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
    const router = useRouter();

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();

        if (!title.trim() || !description.trim()) {
            setMsgError('Please fill out all fields.');
            setShowAlert(true);
            return;
        }

        const newTask: TaskDto = {
            title,
            description,
            done: false
        };

        try {
            setIsSubmitting(true);
            const res: AxiosResponse<any, any> = await api.post('/', newTask);

            if (res.status === 201) {
                setMsgError(res.data); 
                setShowAlert(true);
                clearInputs();

                setTimeout(() => {
                    Navigator.goToHome(router);
                }, 4000);
            } else {
                throw new Error('Unexpected response from server.');
            }

        } catch (error: any) {
            console.error(error);
            setMsgError(error.response?.data || 'Error creating task.');
            setShowAlert(true);
        } finally {
            setIsSubmitting(false);
        }
    }

    function clearInputs() {
        setTitle('');
        setDescription('');
    }

    return (
        <div>
            <Header title="Create new Task" nameBtn="Home" />

            {showAlert && <Alert name={msgError} color="green" time={4000} />}

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
                            className={`flex items-center gap-2 bg-green-600 border text-white px-4 py-2 rounded 
                            ${isSubmitting ? 'opacity-50 cursor-not-allowed' : 'hover:bg-black hover:border'}`}
                        >
                            {isSubmitting ? (
                                <>
                                    <svg 
                                        className="animate-spin h-5 w-5 text-white" 
                                        viewBox="0 0 24 24"
                                    >
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
                                    Processing...
                                </>
                            ) : (
                                'SUBMIT'
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
