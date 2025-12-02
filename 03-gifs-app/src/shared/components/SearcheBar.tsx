interface Props {
    placeholder?: string;
}
const CustomSeacherBar = ({ placeholder = 'Buscar' }: Props) => {
    return (
        <>
            <div className="search-container">
                <input type="text" placeholder={placeholder} />
                <button>Buscar</button>
            </div>
        </>
    )
}

export default CustomSeacherBar
