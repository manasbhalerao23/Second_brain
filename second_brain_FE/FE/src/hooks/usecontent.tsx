import axios from "axios";
import { useEffect, useState } from "react";
import { BACKEND_URL } from "../config";

export function usecontents(){
    const [contents, setcontents] = useState([]);

    useEffect(() => {
        axios.get(`${BACKEND_URL}/api/v1/content`,{
            headers: {
                "Authorization": localStorage.getItem("token")
            }
        })
        .then((response) => {
            setcontents(response.data.content)
        })
    }, [])
    return contents;
}