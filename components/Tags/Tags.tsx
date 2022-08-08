import React from "react";
import { XIcon } from '@heroicons/react/outline'

const Tags = (props: { selectedTags: (arg0: any[]) => void; className: any; }) => {

    const [tags, setTags] = React.useState<any>([]);
    const addTags = (event: any) => {
        if (event.key === "Enter" && event.target.value !== "") {
            setTags([...tags, event.target.value]);
            props.selectedTags([...tags, event.target.value]);
            event.target.value = "";
        }
    };

    const removeTags = (index: any) => {
        setTags([...tags.filter((tag: any) => tags.indexOf(tag) !== index)]);
    };
    return (
        <div className="mt-4 mb-2 w-full flex-1">
            <div className={`${props.className} tags-input rounded flex flex-row flex-wrap`}>
                <ul className="flex flex-row items-center flex-wrap w-full pl-1">
                    {
                        tags.length < 1 ? (<p className="text-xs text-gray-400 w-full">Write a tag below and press enter, e.g bbw</p>) : (
                            <>
                                {tags.map((tag:any, index:number) => (
                                    <li key={index} className="border-blue-200 dark:border-gray-700 bg-blue-100 text-sm text-blue-900 border flex px-1 flex-row items-center rounded m-1">
                                        <span>{tag}</span>
                                        <i
                                            className="material-icons"
                                            onClick={() => removeTags(index)}
                                        >
                                            <XIcon width={12} height={12} className="cursor-pointer ml-1" />
                                        </i>
                                    </li>
                                ))}
                            </>
                        )
                    }
                </ul>

            </div>
            <input
                type="text"
                onKeyUp={event => addTags(event)}
                placeholder="Press enter to add more"
                className="outline-none bg-gray-200 dark:bg-gray-700 p-2 rounded text-sm flex-1 w-full border border-gray-300 dark:border-gray-700 dark my-2"
            />
        </div>
    );
};
export default Tags;