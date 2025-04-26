export default interface TaskDto {
    id?: number
    title?: string
    description?: string
    done?: boolean
    created_at? : Date
    updated_at? : Date
    deleted_at? : Date
}