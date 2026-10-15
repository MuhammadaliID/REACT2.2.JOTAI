import axios from "axios";
import { atom } from "jotai";
import { atomWithRefresh, unwrap } from "jotai/utils";

import { get, set } from "react-hook-form";



export let getDataAtom = atomWithRefresh(async () => {

    try {
        let { data } = await axios.get("https://6a56fbf4b17de7bebbdeaff0.mockapi.io/PEOPLE")
        return data
    } catch (error) {
        console.log(error);

    }



})

export let DataUnwrap = unwrap(getDataAtom)


export let deleteUser = atom(null, async (get, set, id) => {
    try {
        await axios.delete(`https://6a56fbf4b17de7bebbdeaff0.mockapi.io/PEOPLE/${id}`)
        set(getDataAtom)
    } catch (error) {
        console.log(error);

    }
})

export let addUserAtom = atom(null, async (get, set, newUser) => {
    await axios.post("https://6a56fbf4b17de7bebbdeaff0.mockapi.io/PEOPLE", newUser)

    set(getDataAtom)
})

export let editUserAtom = atom(null, async (get, set, user) => {
    await axios.put(`https://6a56fbf4b17de7bebbdeaff0.mockapi.io/PEOPLE/${user.id}`, {
        name: user.name,
        age: Number(user.age)
    })
    set(getDataAtom)
})