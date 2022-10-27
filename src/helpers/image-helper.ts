export const getBase64 = (file: File): Promise<any> => {
   return new Promise((resolve, reject) => {
      const fileReader = new FileReader()
      fileReader.readAsDataURL(file)

      fileReader.onload = () => resolve(fileReader.result)
      fileReader.onerror = err => reject(err)
   })
}
