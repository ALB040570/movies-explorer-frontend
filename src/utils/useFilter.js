

const useFilter=()=>{


  const filterByKeyword=(films, word)=>{
    // debugger
      const filter = films.filter((item) => {

        return item.nameRU.toLowerCase().includes(word);
      });

      return filter
    }
  const fiterByCheckbox=()=>{

  }

  return {filterByKeyword}
}

export default useFilter;