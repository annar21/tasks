class ValidationUtils {
  static validateRGBColor(color) {
    if (!color || color.length !== 3) {
      throw new Error('Invalid RGB code: Incorrect length');
    }
  
    if (color.some((val) => val < 0 || val > 255)) {
      throw new Error('Invalid RGB code: Values out of range'); 
    }
  }
}

class Color {
  constructor(red, green, blue) {
    ValidationUtils.validateRGBColor([red, green, blue]);
    this._color = [red, green, blue];
  }

  get color() {
    return this._color;
  }

  set color(color) {
    ValidationUtils.validateRGBColor(color);
    this._color = color;
    color_service.changeColor(color);
    color_service.setInputs(color);
  }
}

class ColorService {
  constructor(color_manager) {
    this.color_manager = color_manager;
  }

  invertColor(color) {
    ValidationUtils.validateRGBColor(color);
    return color.map((val) => 255 - val);
  }
  
  changeColor(color) {
    ValidationUtils.validateRGBColor(color);
    localStorage.setItem('color', JSON.stringify(color));
    show.style.backgroundColor = `rgb(${color[0]}, ${color[1]}, ${color[2]})`;
  }

  setInputs(color) {
    redInput.value = color[0];
    greenInput.value = color[1];
    blueInput.value = color[2];
  }
}


const setButton = document.getElementById('set');
const invertButton = document.getElementById('invert');
const redInput = document.getElementById('red');
const greenInput = document.getElementById('green');
const blueInput = document.getElementById('blue');
const show = document.getElementById('show__color');
const form = document.querySelector('form');

const color_manager = new Color(0, 0, 0);
const color_service = new ColorService(color_manager);
const colorFromLocalStorage = JSON.parse(localStorage.getItem('color'));
if(colorFromLocalStorage) { 
  color_manager.color = colorFromLocalStorage.map((val) => parseInt(val));
  color_service.setInputs(colorFromLocalStorage);
}

setButton.addEventListener("click", (event) => {
  event.preventDefault();

  const red = redInput.value;
  const green = greenInput.value;
  const blue = blueInput.value;
  color_manager.color = [red, green, blue];
});

invertButton.addEventListener("click", (event) => {
  event.preventDefault();

  const color = color_manager.color;
  const invertedColor = color_service.invertColor(color);
  color_manager.color = invertedColor;
});

form.addEventListener("submit", (event) => {
  event.preventDefault();
});  