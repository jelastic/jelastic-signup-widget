(function () {
    // init scripts
    const wrapper_elements = document.getElementsByClassName('jlc-wrapper');

    Array.from(wrapper_elements).forEach((wrapper) => {
        ToggleShowElement(wrapper, false);

        const jlc_button_text = wrapper.getAttribute('data-text') || 'GET STARTED NOW';
        var has_label = wrapper.getAttribute('data-terms') || false;
        var terms_link = wrapper.getAttribute('data-terms-link') || '#';
        var privacy_links = wrapper.getAttribute('data-privacy-link') || '#';

        // create HTML elements
        // create main element
        const jlc_cover_element = CreateElement('div', {
            className: 'jlc-cover'
        });
        wrapper.appendChild(jlc_cover_element);

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

        const jlc_input_wrapper_element = CreateElement('div', {
            className: 'jlc-input-wrapper'
        });
        jlc_form_element.appendChild(jlc_input_wrapper_element);

        // create email input
        const jlc_input_element = CreateElement('input', {
            className: 'jlc-input',
            placeholder: 'your@email.com',
            type: 'email',
            required: 'true'
        });
        jlc_input_wrapper_element.appendChild(jlc_input_element);

        // create form button
        const jlc_sbmt_element = CreateElement('button', {
            className: 'jlc-sbmt'
        });
        jlc_input_wrapper_element.appendChild(jlc_sbmt_element);

        if (has_label !== "false" || has_label === false) {

            const jlc_terms_element = CreateElement('label', {
                className: 'jlc-terms-label'
            });
            jlc_form_element.appendChild(jlc_terms_element);

            const jlc_terms_input_element = CreateElement('input', {
                type: 'checkbox',
                name: 'accept_terms',
                className: 'jlc-terms-checkbox',
                required: 'required'
            });
            jlc_terms_element.appendChild(jlc_terms_input_element);

            const jlc_terms_text_element = CreateElement('span', null, 'Read and accept <a target="_blank" href="' + terms_link + '">Terms of Use</a> & <a target="_blank" href="' + privacy_links + '">Privacy Policy</a>');
            jlc_terms_element.appendChild(jlc_terms_text_element);

            jlc_terms_input_element.addEventListener("change", ValidateForm, false);

        }

        // EVENTS
        // show form
        jlc_btn_element.addEventListener('click', ShowForm);
        // send form
        if (jlc_form_element.addEventListener) {
            jlc_form_element.addEventListener('submit', SubmitForm, false); //Modern browsers
        } else if (jlc_form_element.attachEvent) {
            jlc_form_element.attachEvent('onsubmit', SubmitForm); //Old IE
        }

        jlc_input_element.addEventListener("change", ValidateForm, false);
        jlc_input_element.addEventListener("keyup", ValidateForm, false);

    });

    document.onreadystatechange = function () {
        if (document.readyState === 'complete') {
            Array.from(wrapper_elements).forEach((wrapper) => {
                ToggleShowElement(wrapper, true)
            })

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
            element.innerHTML = text;
        }
        return element;
    }

    function ShowForm() {
        const wrapper = FindClosestAncestor(this, '.jlc-wrapper'),
            jlc_cover_element = wrapper.getElementsByClassName("jlc-cover")[0],
            jlc_form_element = wrapper.getElementsByClassName("jlc-form")[0];

        VanilaAddClass(jlc_cover_element, 'is_active');
        const jlc_form_element_style = window.getComputedStyle(jlc_form_element);
        const jlc_form_element_minWidth = jlc_form_element_style.getPropertyValue('min-width');
        if (parseInt(jlc_form_element_minWidth) !== 0) {
            wrapper.style.width = wrapper.style.minWidth = jlc_form_element_minWidth;
        }
    }

    function VanilaAddClass(element, className) {
        if (element.classList) {
            element.classList.add(className);
        } else {
            element.className += ' ' + className;
        }
    }

    function VanilaRemoveClasss(element, className) {
        if (element.classList.contains(className)) {
            element.classList.remove(className);
        }
    }

    function ValidateForm(event) {
        const element = event.target;
        const wrapper = FindClosestAncestor(element, '.jlc-wrapper');
        const jlc_form_element = wrapper.getElementsByClassName("jlc-form")[0];
        const email = jlc_form_element.getElementsByClassName("jlc-input")[0];
        const has_label = wrapper.getAttribute('data-terms') || false;
        var terms_checked = false;
        if (has_label !== "false" || has_label === false) {
            terms_checked = wrapper.getElementsByClassName("jlc-terms-checkbox")[0].checked;
        }
        
        let result = ValidateEmail(email.value);
        if (result && terms_checked) {
            VanilaAddClass(jlc_form_element, 'jlc-form__valid');
        } else {
            VanilaRemoveClasss(jlc_form_element, 'jlc-form__valid')
        }
    }

    function FindClosestAncestor(element, selector) {
        while ((element = element.parentElement) && !((element.matches || element.matchesSelector).call(element, selector))) ;
        return element;
    }

    function ShowErrorMessage(wrapper, message, customClass = '') {
        const jlc_error_element = CreateElement('div', {
            class: 'jlc-error ' + customClass
        }, message);
        wrapper.appendChild(jlc_error_element);
    }

    function InputFocusFunction() {
        const wrapper = FindClosestAncestor(this, '.jlc-wrapper'),
            jlc_form_element = wrapper.getElementsByClassName("jlc-form")[0];
        VanilaAddClass(jlc_form_element, 'jlc-form__focused')
    }

    function InputBlurFunction() {
        const wrapper = FindClosestAncestor(this, '.jlc-wrapper'),
            jlc_form_element = wrapper.getElementsByClassName("jlc-form")[0];
        VanilaRemoveClasss(jlc_form_element, 'jlc-form__focused');
    }

    function ToggleShowElement(wrapper, status) {
        let opacity = '0.5',
            filter = 'blur(4px)'
        if (status) {
            opacity = '1',
                filter = 'none'
        }
        wrapper.style.opacity = opacity;
        wrapper.style.filter = filter;
    }

    function ValidateEmail(email) {
        let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }

    function SubmitForm(event) {
        event.preventDefault();

        const wrapper = FindClosestAncestor(this, '.jlc-wrapper'),
            jlc_form_element = wrapper.getElementsByClassName("jlc-form")[0],
            jlc_sbmt_element = wrapper.getElementsByClassName("jlc-sbmt")[0],
            jlc_input_element = wrapper.getElementsByClassName("jlc-input")[0];

        var jlc_text_error = wrapper.getAttribute('data-tx-error') || 'An error has occurred, please try again later',
            jlc_text_exist = wrapper.getAttribute('data-tx-exist') || 'This email is already registered.<br>Please ',
            jlc_text_exist_linked = wrapper.getAttribute('data-tx-exist-linked') || 'sign in to access',
            jlc_text_success = wrapper.getAttribute('data-tx-success') || 'CHECK YOUR EMAIL',
            jlc_hoster_domain = wrapper.getAttribute('data-key') || 'jelastichosting.nl';

        if (jlc_hoster_domain.indexOf('app.') > -1) {
            jlc_hoster_domain = jlc_hoster_domain.replace('app.', '');
        }

        VanilaAddClass(jlc_form_element, 'jlc-form__sending');

        // check if error message is shown and delete it
        let jlc_error_element = document.getElementsByClassName('jlc-error')[0];
        if (typeof (jlc_error_element) != 'undefined' && jlc_error_element != null) {
            wrapper.removeChild(jlc_error_element)
        }

        const email = encodeURIComponent(jlc_input_element.value);
        const requestUrl = 'https://reg.' + jlc_hoster_domain + '/signup';

        const request = new XMLHttpRequest();
        const request_params = 'email=' + email;

        request.open('POST', requestUrl, true);
        request.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');

        request.onload = function () {
            if (request.status >= 200 && request.status < 400) {

                jlc_text_exist += "<a target='_blank' href='https://app." + jlc_hoster_domain + "'>" + jlc_text_exist_linked + "</a>.";
                // Success!
                const resp = JSON.parse(request.responseText);
                if (resp.result === 0) {
                    if (resp.response.exist && resp.response.activated) {
                        ShowErrorMessage(wrapper, jlc_text_exist, 'user-exist');
                        VanilaRemoveClasss(jlc_form_element, 'jlc-form__sending');
                    } else {
                        VanilaRemoveClasss(jlc_form_element, 'jlc-form__sending');
                        VanilaAddClass(jlc_form_element, 'jlc-form__succeed')
                        jlc_sbmt_element.disabled = jlc_input_element.disabled = true;
                        jlc_input_element.value = jlc_text_success;
                    }
                }
            } else {
                // We reached our target server, but it returned an error
                ShowErrorMessage(wrapper, jlc_text_error);
                VanilaRemoveClasss(jlc_form_element, 'jlc-form__sending');
            }
        }
        request.onerror = function (e) {
            // There was a connection error of some sort
            ShowErrorMessage(wrapper, jlc_text_error);
            VanilaRemoveClasss(jlc_form_element, 'jlc-form__sending');
        }
        request.send(request_params);
    }

}());
