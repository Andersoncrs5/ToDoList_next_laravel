import TaskDto from "@/DTOs/TaskDto";
import api from "@/services/api";
import { AxiosResponse } from "axios";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { useRouter } from 'next/navigation'; // Importa o router

interface Types {
    task: TaskDto
}

export default function Showtask(props: Types) {

    return (
        
    );
}