import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteTitle, fetchTitles } from "../store/slices/titleSlice";
import { AppDispatch, RootState } from "../store/store";
import { NewTitleCard } from "./newTitle";

export const DashboardContainer = () => {
    const dispatch: AppDispatch = useDispatch();
    const state = useSelector((state: RootState) => state);
    const walletAddress = state.walletAddress.walletAddress;
    const titles = useSelector((state: RootState) => state.titles.titles);
    const titleStatus = useSelector((state: RootState) => state.titles.status);
    const titleError = useSelector((state: RootState) => state.titles.error);
    const [showNewTitle, setShowNewTitle] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);

    const handleNewTitleSubmit = (newTitle: any) => {
        console.log("New title submitted:", newTitle);
        setShowNewTitle(false);
    };

    useEffect(() => {
        if (titleStatus === 'idle') {
            dispatch(fetchTitles());
        }
    }, [dispatch]);

    const handleDeleteTitle = async (uuid: string) => {
        if (window.confirm('Are you sure you want to delete this title?')) {
            if (!walletAddress) {
                console.log("Not connected");
                alert("Please connect the wallet");
                return;
            }
            console.log(walletAddress);
            try {
                await dispatch(deleteTitle(uuid)).unwrap(); // Dispatch deleteTitle action
            } catch (error) {
                console.error("Failed to delete title:", error);
                alert("Failed to delete title");
            }
        }
    };

    if (titleStatus === 'loading') {
        return <div>Loading...</div>;
    }

    if (titleStatus === 'failed') {
        return <div>Error: {titleError}</div>;
    }

    // Calculate displayed titles based on current page
    const totalTitles = titles.length;
    const maxRows = showNewTitle ? 5 : 10; // Show 5 rows when form is displayed, else show 10
    const startIndex = (currentPage - 1) * maxRows;
    const endIndex = startIndex + maxRows;
    const displayedTitles = titles.slice(startIndex, endIndex);

    const totalPages = Math.ceil(totalTitles / maxRows); // Calculate total pages

    return (
        <div className="container border border-[#3074f4] rounded-lg py-4 my-4 mx-4 px-4">
            <div className="flex justify-end mb-4">
                <button
                    onClick={() => setShowNewTitle(!showNewTitle)} // Toggle form visibility
                    className={`flex rounded-lg font-bold px-4 py-2 border text-black ${showNewTitle ? 'bg-red-600 hover:bg-red-700' : 'bg-green-300 hover:bg-green-400'}`}
                >
                    {showNewTitle ? "Cancel" : "Add Title"} {/* Change button text */}
                    {/* Hide SVG when form is shown */}
                    {!showNewTitle && (
                        <svg width="24px" height="24px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                            <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
                            <g id="SVGRepo_iconCarrier">
                                <g id="Edit / Add_Plus_Circle">
                                    <path id="Vector" d="M8 12H12M12 12H16M12 12V16M12 12V8M12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12C21 16.9706 16.9706 21 12 21Z" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
                                </g>
                            </g>
                        </svg>
                    )}
                </button>
            </div>
            {showNewTitle && <div className="flex justify-center"><NewTitleCard onPostSubmit={handleNewTitleSubmit} /></div>}
            <table className="min-w-full rounded-xl bg-[#FFFFFF] text-black">
                <thead>
                    <tr className="bg-[#3074f4] rounded-lg">
                        <th className="py-3 px-6 text-left">Title</th>
                        <th className="py-3 px-6 text-left">Subject</th>
                        <th className="py-3 px-6 text-left">Description</th>
                        <th className="py-3 text-center">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {displayedTitles.map(title => (
                        <tr key={title.uuid} className="rounded-xl border-gray-600 hover:bg-gray-400">
                            <td className="py-3 px-6 break-words max-w-xs">{title.title}</td>
                            <td className="py-3 px-6 break-words max-w-xs">{title.subject}</td>
                            <td className="py-3 px-6 break-words max-w-xs">{title.description}</td>
                            <td className="py-3 px-6 flex justify-center">
                                <button className='flex hover:bg-red-300 rounded-lg px-2' onClick={() => handleDeleteTitle(title.uuid)}>Delete
                                    <svg className="pl-1" width="24px" height="24px" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" fill="#000000">
                                        <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                                        <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
                                        <g id="SVGRepo_iconCarrier">
                                            <path fill="#ff0000" d="M352 192V95.936a32 32 0 0 1 32-32h256a32 32 0 0 1 32 32V192h256a32 32 0 1 1 0 64H96a32 32 0 0 1 0-64h256zm64 0h192v-64H416v64zM192 960a32 32 0 0 1-32-32V256h704v672a32 32 0 0 1-32 32H192zm224-192a32 32 0 0 0 32-32V416a32 32 0 0 0-64 0v320a32 32 0 0 0 32 32zm192 0a32 32 0 0 0 32-32V416a32 32 0 0 0-64 0v320a32 32 0 0 0 32 32z"></path>
                                        </g>
                                    </svg>
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {/* Pagination Controls */}
            <div className="flex justify-between items-center mt-4">
                <button
                    onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                    className="bg-white text-black rounded-lg px-4 py-2"
                >
                    Previous
                </button>
                <div>
                    Page {currentPage} of {totalPages}
                </div>
                <button
                    onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}
                    className="bg-white text-black rounded-lg px-4 py-2"
                >
                    Next
                </button>
            </div>
        </div>
    );
};
