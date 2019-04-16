export class LoadFormData {
    static byIdInputs (campos) {
      for (let key in campos) {
        let element = document.getElementById(key)
  
        if (element) {
          setTimeout(function () {
            element.value = campos[key]
          }, 500)
        }
      }
    }
  }
  