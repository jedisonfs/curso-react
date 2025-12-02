import { mockGifs } from "./mock-data/gifs.mock";
import CustomHeader from './shared/components/CustomHeader';
import SearchBar from "./shared/components/SearcheBar";
import PreviousSearches from "./gifs/PreviousSearches";
import GifsList from "./gifs/GifsList";
import { useState } from "react";

const [previousTerm, setPreviousTerm] = useState(["dragon ball z"]);
const handleTermClick = (term: string) => {
    console.log(term);
};

const GifsApp = () => {
    return (
        <>
            {/* Header */}
            <CustomHeader
                title="Buscador de Gifs"
                description="Descubre y comparte el gif" />

            {/* Searche */}
            <SearchBar />

            {/* Busquedas previas*/}
            <PreviousSearches
                searches={previousTerm}
                onLabelClick={handleTermClick} />

            {/* Gifs */}
            <GifsList gifs={mockGifs} />
        </>
    )
}

export default GifsApp
