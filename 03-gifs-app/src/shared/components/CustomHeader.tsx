interface Props {
    title: string;
    description: string;
}

const CustomHeader = ({ title, description }: Props) => {
    return (
        <>
            <div className="content-center">
                <h1>{title}</h1>
                {
                    description && ( // Si la descripcion existe ejecute el <p></p>
                        <p>Descubre y comparte el gif perfecto</p>
                    )
                }
            </div>
        </>
    )
}

export default CustomHeader
