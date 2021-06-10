import { useCallback } from "react";



const useFilter=()=>{

  const filterByKeyword=useCallback((films, word)=>{
      const filter = films.filter((item, i) => {
        if (word==="*") {
          return films
        }
        return item.nameRU&&item.nameRU.toLowerCase().includes(word)
      });
      return filter

    },[])
  const fiterByCheckbox=useCallback((films)=>{
    const filter = films.filter((item, i) => {
      return item.duration&&item.duration <= 40
    });
    return filter
  },[])

  return {filterByKeyword, fiterByCheckbox }
}

export default useFilter;