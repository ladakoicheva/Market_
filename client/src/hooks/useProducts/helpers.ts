
export const setUrlForProducts = (page: number, index: number, search: string) => {
  let link = `?page=${page}&index=${index}`
  if (search.trim()) link += `&text=${search}`
  history.replaceState(null, '', link)
}

