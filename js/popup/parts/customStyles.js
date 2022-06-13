export const customStyles = {
  apply(main) {
    try {
      const container = document.querySelector('.container');

      let customStyles = main['customStyles'] ? main['customStyles'] : false;

      if (!customStyles) false;

      Object.keys(customStyles).forEach(key => {
        if (container.querySelectorAll(`.${key}`)) {
          container.querySelectorAll(`.${key}`).forEach(element => {
            element.style = Object.keys(customStyles[key]).map(property => {
              return `${property}: ${customStyles[key][property]};`
            }).join('');
          })
        }
      });
    } catch (error) {
      console.log(error);
    }
  }
}