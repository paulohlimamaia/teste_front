export class Serialize {
    static toObject (idForm) {
      let myForm = document.getElementById(idForm)
      let formData = new FormData(myForm)
      let result = {}
  
      for (let entry of formData.entries()) {
        result[entry[0]] = entry[1]
      }
      return JSON.stringify(result)
    }
    static withFormData (idForm) {
      let myForm = document.getElementById(idForm)
      return  new FormData(myForm)
    }
  }
  