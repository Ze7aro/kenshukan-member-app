import { useState, useEffect } from 'react'
import dataService from '../data/data'

const useDataHook = () => {
    const [data, setData] = useState([]);
    
    useEffect(() => {
        dataService
        .getData()
        .then(initialData => {
          setData(initialData)
        })
    }, [])
    

    return {data: data}
}

export default useDataHook