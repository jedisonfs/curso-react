import { useState } from "react";

interface Props {
    placeholder?: string;
    onClick: (query: string) => void;
}
const CustomSeacherBar = ({ placeholder = 'Buscar', onClick }: Props) => {
    const [query, setQuery] = useState(''); // Esta dentro del componenete poque solo le importa aeste y no ncesita estar afuera


    return (
        <>
            <div className="search-container">
                <input
                    type="text"
                    placeholder={placeholder}

                    onChange={(event => setQuery)} />
                <button>Buscar</button>
            </div>
        </>
    )
}

export default CustomSeacherBar
