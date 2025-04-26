interface Types {
    title: string
}

export default function ErrorGeral(props: Types) {
    return (
        <div className="flex items-center justify-center min-h-screen ">
            <div className="  text-center shadow-md w-full max-w-md border-red-950 ">
                <h1>{props.title}</h1>
            </div>
        </div>
    );
}