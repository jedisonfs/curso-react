import type { FC } from "react"

interface Props {
    searches: string[];
    onLabelClick: (term: string) => void;
}
const PreviousSearches: FC<Props> = ({ searches, onLabelClick }) => {
    return (
        <>
            <div className="previous-searches">
                <h2>Busquedas previas</h2>
                <ul className="previous-searches-list">
                    {
                        searches.map((term) => (
                            <li key={term}
                                onClick={() => console.log(term)}
                            >{term}
                            </li>
                        ))
                    }
                </ul>
            </div >
        </>
    )
}

export default PreviousSearches
