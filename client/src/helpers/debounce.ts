export function debounce<T extends (...args: any[]) => any>(
  func: T, 
  delay: number = 500
): (...args: Parameters<T>) => Promise<ReturnType<T>> {
  let timeoutId: ReturnType<typeof setTimeout>;

  return function (...args: Parameters<T>): Promise<ReturnType<T>> {
    clearTimeout(timeoutId);

    return new Promise((resolve) => {
      timeoutId = setTimeout(() => {
        const result = func(...args);
        resolve(result); // Передаем результат выполнения функции наружу
      }, delay);
    });
  };
}

// function saveInput(){
//   console.log('Saving data');
// }
// const processChange = debounce(saveInput, 500);

