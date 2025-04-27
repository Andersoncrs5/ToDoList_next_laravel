import BtnDefault from "./BtnDefault.component";

interface Types {
    title: string
    urlBtn?: string
    nameBtn?: string
}

export default function Header(props: Types) {
    return (
        <header className="grid grid-cols-3 gap-4 p-3 border-2 text-white">
            <div>
                <h1 className="font-serif" >{props.title}</h1> 
            </div>
            <div>
                
            </div>
            <div className="text-center" >
                <BtnDefault color="black" name={props.nameBtn || 'NONE'} url={props.urlBtn || '/' } />
            </div>
        </header>
    );
}
