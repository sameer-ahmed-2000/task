import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { addTitle } from "../store/slices/titleSlice";
import { AppDispatch, RootState } from "../store/store";

interface NewTitleCardProps {
    onPostSubmit: (newTitle: any) => void;  // Expecting the new title as an argument
}

export const NewTitleCard = ({ onPostSubmit }: NewTitleCardProps) => {
    const [title, setTitle] = useState('');
    const [subject, setSubject] = useState('');
    const [description, setDescription] = useState('');
    const dispatch = useDispatch<AppDispatch>();
    const state=useSelector((state:RootState)=>state)
    const walletAddress = state.walletAddress.walletAddress
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const newTitle = {
            title,
            subject,
            description: description || null,
        };
        try {
            if (!walletAddress || walletAddress === null) {
                console.log(" Not connected");
                alert("Please connect the wallet");
                return;
            }
            console.log(walletAddress)
            await dispatch(addTitle(newTitle)).unwrap();
            onPostSubmit(newTitle);
            setTitle('');
            setSubject('');
            setDescription('');

        } catch (error) {
            console.error("Failed to add title:", error);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="p-4 rounded-lg my-2 shadow-md max-w-2xl">
            <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter title"
                className="w-full p-2 border rounded-lg"
            />
            <input
                type="text"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder="Enter subject"
                className="w-full p-2 border rounded-lg mt-2"
            />
            <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Enter description"
                className="w-full p-2 border rounded-lg mt-2"
            />
            <button type="submit" className="rounded h-8 w-24 px-4 py-1 bg-green-600 font-medium text-sm bg-custom-red text-white mt-4" >
                Add
            </button>
        </form>
    );
};
