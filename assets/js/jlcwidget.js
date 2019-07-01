(function () {
  // init scripts
  const jlcWrapper = document.getElementsByClassName('jlc-wrapper')[0];
  toggleShowWrapper(false)

  // main variables
  const jlc_button_text = jlcWrapper.getAttribute('data-text') || 'GET STARTED FOR FREE',
    jlc_text_error = jlcWrapper.getAttribute('data-tx-error') || 'An error has occurred, please try again later',
    jlc_text_success = jlcWrapper.getAttribute('data-tx-success') || 'CHECK YOUR EMAIL',
    jlc_hoster_domain = jlcWrapper.getAttribute('data-key') || 'jelastichosting.nl';

  // create HTML elements
  // create main element
  const jlc_cover_element = CreateElement('div', {
    className: 'jlc-cover'
  });
  jlcWrapper.appendChild(jlc_cover_element);

  // create main button
  const jlc_btn_element = CreateElement('button', {
    className: 'jlc-btn'
  }, jlc_button_text);
  jlc_cover_element.appendChild(jlc_btn_element);

  // create main form
  const jlc_form_element = CreateElement('form', {
    className: 'jlc-form'
  });
  jlc_cover_element.appendChild(jlc_form_element);

  // create email input
  const jlc_input_element = CreateElement('input', {
    className: 'jlc-input',
    placeholder: 'your@email.com',
    type: 'email',
    required: 'true'
  });
  jlc_form_element.appendChild(jlc_input_element);

  // create form button
  const jlc_sbmt_element = CreateElement('button', {
    className: 'jlc-sbmt'
  });
  jlc_form_element.appendChild(jlc_sbmt_element);

  // EVENTS
  // init event listeners
  jlc_btn_element.addEventListener('click', showForm);

  if (jlc_form_element.addEventListener) {
    jlc_form_element.addEventListener('submit', submitForm, false); //Modern browsers
  } else if (jlc_form_element.attachEvent) {
    jlc_form_element.attachEvent('onsubmit', submitForm); //Old IE
  }

  jlc_input_element.addEventListener('focus', inputFocusFunction, true);
  jlc_input_element.addEventListener('blur', inputBlurFunction, true);
  jlc_input_element.addEventListener("keypress", validateInputedEmail, false);

  // base width will be changed after document loaded, based on button content width
  // if you want to leave fixed button size - comment next string
  document.onreadystatechange = function () {
    if (document.readyState === 'complete') {
      setFormWithByButton()
      toggleShowWrapper(true)
    }
  }
  // FUNCTIONS
  /* create DOM element function.
    tagName - type of new html tag | string
    attrs - element attributes, like class, placeholder ... | object {attribute_name : 'attribute_value'}
    text - inner text of element. leave blank if the block does not contain text | string
  */
  function CreateElement(tagName, attrs, text) {
    const element = document.createElement(tagName);
    if (attrs) {
      for (let attribute in attrs) {
        let value = attrs[attribute];
        if (attribute === 'className') {
          attribute = 'class';
        }
        let element_attribute = document.createAttribute(attribute);
        element_attribute.value = value;
        element.setAttributeNode(element_attribute);
      }
    }
    if (text) {
      let element_content = document.createTextNode(text);
      element.appendChild(element_content);
    }
    return element;
  }

  function validateInputedEmail(element) {
    let result = validateEmail(element.target.value);
    if (result) {
      inputBlurFunction();
    } else {
      inputFocusFunction()
    }
  }

  function validateEmail(email) {
    let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }

  function setFormWithByButton() {
    const jlc_btn_element_style = window.getComputedStyle ? getComputedStyle(jlc_btn_element, null) : jlc_btn_element.currentStyle;
    const jlc_btn_element_width = Math.ceil(parseFloat(jlc_btn_element_style.width.replace(/[^0-9 | ^.]/g, ''))) || 0;
    jlcWrapper.style.width = jlc_btn_element.style.width = jlc_btn_element_width + 'px';

    if (jlc_btn_element_width < 230) {
      vanilaAddClass(jlc_cover_element, 'jlc-cover--short')
    } else if ((jlc_btn_element_width > 230) && (jlc_btn_element_width < 270)) {
      vanilaAddClass(jlc_cover_element, 'jlc-cover--medium');
    }
    if (jlc_btn_element_width < 270) {
      jlc_input_element.addEventListener("keypress", changeFormSize, false);
    }
  }

  function changeFormSize() {
    // disable on "Enter" key
    if (event.keyCode !== 13) {
      let newWidth = (110 + (this.value.length + 1) * 8);
      jlcWrapper.style.width = newWidth + 'px';
      if (newWidth > 230) {
        vanilaAddClass(jlc_cover_element, 'jlc-cover--succeeddef')
      } else {
        vanilaRemoveClasss(jlc_cover_element, 'jlc-cover--succeeddef')
      }
    }
  }

  function toggleShowWrapper(status) {
    let opacity = '0.5',
      filter = 'blur(4px)'
    if (status) {
      opacity = '1',
        filter = 'none'
    }
    jlcWrapper.style.opacity = opacity;
    jlcWrapper.style.filter = filter;
  }

  function showForm() {
    vanilaAddClass(jlc_cover_element, 'is_active')
    // TODO
    const jlc_form_element_style = window.getComputedStyle(jlc_form_element);
    const jlc_form_element_minWidth = jlc_form_element_style.getPropertyValue('min-width');
    if (parseInt(jlc_form_element_minWidth) !== 0) {
      jlcWrapper.style.width = jlcWrapper.style.minWidth = jlc_form_element_minWidth;
    }
  }

  function inputFocusFunction() {
    vanilaAddClass(jlc_form_element, 'jlc-form__focused')
  }

  function inputBlurFunction() {
    vanilaRemoveClasss(jlc_form_element, 'jlc-form__focused');
  }

  function vanilaAddClass(element, className) {
    if (element.classList) {
      element.classList.add(className);
    } else {
      element.className += ' ' + className;
    }
  }

  function vanilaRemoveClasss(element, className) {
    if (element.classList.contains(className)) {
      element.classList.remove(className);
    }
  }

  function submitForm(e) {
    e.preventDefault();
    vanilaAddClass(jlc_form_element, 'jlc-form__sending');

    // check if error is shown and delete it
    let jlc_error_element = document.getElementsByClassName('jlc-error')[0];
    if (typeof (jlc_error_element) != 'undefined' && jlc_error_element != null) {
      jlcWrapper.removeChild(jlc_error_element)
    }

    const email = encodeURIComponent(jlc_input_element.value);
    const requestUrl = 'https://reg.' + jlc_hoster_domain + '/signup';

    const request = new XMLHttpRequest();
    const request_params = 'email=' + email;

    request.open('POST', requestUrl, true);
    request.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');

    request.onload = function () {
      if (request.status >= 200 && request.status < 400) {
        // Success!
        const resp = JSON.parse(request.responseText);
        if (resp.result === 0) {
          vanilaRemoveClasss(jlc_form_element, 'jlc-form__sending');
          vanilaAddClass(jlc_form_element, 'jlc-form__succeed')
          jlc_sbmt_element.disabled = jlc_input_element.disabled = true;
          jlc_input_element.value = jlc_text_success;
        }
      } else {
        // We reached our target server, but it returned an error
        showErrorMessage(jlc_text_error);
        vanilaRemoveClasss(jlc_form_element, 'jlc-form__sending');
      }
    }

    request.onerror = function (e) {
      // There was a connection error of some sort
      showErrorMessage(jlc_text_error);
      vanilaRemoveClasss(jlc_form_element, 'jlc-form__sending');
    }

    request.send(request_params);
  }

  function showErrorMessage(message) {
    const jlc_error_element = CreateElement('div', {
      class: 'jlc-error'
    }, message);
    jlcWrapper.appendChild(jlc_error_element);
  }

}());
