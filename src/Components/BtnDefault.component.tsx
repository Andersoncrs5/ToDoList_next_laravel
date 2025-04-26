import Link from "next/link";

interface values {
    url: string
    color: string
    name: string
}

export default function BtnDefault(props: values) {
    return (
        <Link href={`/${props.url}`} className={`bg-${props.color} border-2 rounded p-1 pe-3 ps-3`}>
            {props.name}
        </Link>
        
    );
}