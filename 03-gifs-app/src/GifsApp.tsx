import { mockGifs } from "./mock-data/gifs.mock";
import CustomHeader from './shared/components/CustomHeader';
import SearchBar from "./shared/components/SearcheBar";
import PreviousSearches from "./gifs/PreviousSearches";
import GifsList from "./gifs/GifsList";

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
            <PreviousSearches searches={["Goku", "Dragon Ball Z"]} />

            {/* Gifs */}
            <GifsList gifs={mockGifs} />
        </>
    )
}

export default GifsApp
