export const getQuery = (data: Record<string, any>) => {
  const query = new URLSearchParams()
  Object.entries(data).forEach(([key, value]) => {
    if (value === null) return 
    query.set(key, String(value))
  })

  return query.toString() 
}