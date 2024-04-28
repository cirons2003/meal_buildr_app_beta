import BottomBar from "../components/layout/BottomBar";
import PagerViewContent from "../components/layout/PagerViewContent";


export default function ContentPage({activePicture, setActivePicture, setPageIndex, pageIndex, pagerViewRef}) {
    return (
        <>
            <PagerViewContent activePicture = {activePicture} setActivePicture = {setActivePicture} setPageIndex = {setPageIndex} pagerViewRef = {pagerViewRef}/>
            <BottomBar pageIndex = {pageIndex} activePicture = {activePicture} setPage = {setPage}/>
        </>
    )
}