import TaskDto from "@/DTOs/TaskDto";
import api from "@/services/api";
import { AxiosResponse } from "axios";

interface Types {
    task: TaskDto
}

export default function Showtask(props: Types) {

    async function deleteTask(id: any){
        if (!id) {
            console.error('Error: Id is required');
            return;
        }

        const res: AxiosResponse<any, any> = await api.delete('/', id);

        if (res.status == 500) {
            
        }

        if (res.status == 400) {
            
        }

        if (res.status == 404) {
            
        }

        if (res.status == 200) {

        }

        return;
    }

    return (
        <div className="grid grid-cols-3 gap-4 text-white w-[80%] my-3 p-2 border rounded text-center mx-auto " >
            <div>
                <h3>{props.task.title}</h3>
            </div>
            <div>
                <p>{props.task.description}</p>
            </div>
            <div>
                <button className="p-0.5 px-3 rounded border-red-600 " > DELETE </button>
                <button className="p-0.5 px-3 border rounded border-yellow-300 " > UPDATE </button>
            </div>
        </div>
    );
}