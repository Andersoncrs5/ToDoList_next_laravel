import { RefObject, useEffect, useRef } from "react";

interface Types {
  name: string;
  time?: number
  color?: string
}

export default function Alert(props: Types) {
  const divRef: RefObject<HTMLDivElement | null> = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const div: HTMLDivElement | null = divRef.current;
    if (!div) return;

    div.style.display = 'block';

    const timeout = setTimeout(() => {
      div.style.display = 'none';
    }, props.time || 4000 );

    return () => clearTimeout(timeout);
  }, []);

  return (
    <div
      ref={divRef}
      style={{
        position: 'absolute',
        top: '2%',
        left: '50%',
        transform: 'translateX(-50%)',
        display: 'none'
      }}
      id="SuccessDiv"
      className={`w-[96%] p-3 text-center mx-auto z-50 bg-${props.color || 'green'}-600 border rounded-xl`}
    >
      <h2>{props.name}</h2>
    </div>
  );
}
