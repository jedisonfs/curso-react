import type { FC } from "react"
import type { Gif } from "../mock-data/gifs.mock"

/* Reciba un props: gifs: Gif[] 
y cuando se llame a este componente se llame como mockgifs, dentro del componente como gif */
interface Props {
    gifs: Gif[]
}

const GifsList: FC<Props> = ({ gifs }) => { /* Tambien se puede definir de esta forma que tipo es */
    return (
        <>
            <div className="gifs-container">
                {gifs.map((gif) => (
                    <div key={gif.id} className="gif-card">
                        <img src={gif.url} alt={gif.title} />
                        <h3>{gif.title}</h3>
                        <p>
                            {gif.width}x{gif.height}
                        </p>
                    </div>
                ))
                }
            </div>
        </>
    )
}

export default GifsList
