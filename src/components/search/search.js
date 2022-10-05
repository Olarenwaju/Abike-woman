import React from "react"
import{ BiSearch } from "react-icons/bi"


const Search = ({value, onChange}) =>{
    return (
        <form className="flex border-none bg-zinc-200 rounded-md p-1 items-center">
            <input type="text" class="border-none bg-zinc-200 mr-3" placeholder="search item" 
                value={value} onChange={onChange} />
            <BiSearch size={18} class="text-gray-500"/>
        </form>
    )
}

export default Search;