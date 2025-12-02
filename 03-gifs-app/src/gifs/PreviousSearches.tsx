import type { FC } from "react"

interface Props {
    searches: string[]
}
const PreviousSearches: FC<Props> = ({ searches }) => {
    return (
        <>
            <div className="previous-searches">
                <h2>Busquedas previas</h2>
                <ul className="previous-searches-list">
                    {
                        searches.map((term) => (
                            <li key={term}>{term}</li>
                        ))
                    }
                </ul>
            </div >
        </>
    )
}

export default PreviousSearches
