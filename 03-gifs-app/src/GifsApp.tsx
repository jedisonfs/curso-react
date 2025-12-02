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

const handleSearch = (query: string) => {
    console.log(query);
}

const GifsApp = () => {
    return (
        <>
            {/* Header */}
            <CustomHeader
                title="Buscador de Gifs"
                description="Descubre y comparte el gif" />

            {/* Searche */}
            <SearchBar
                placeholder="Busca lo que quieras"
                onQuery={(query: string) => handleSearch(query)} />

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
