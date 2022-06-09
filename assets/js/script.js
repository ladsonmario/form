let validador = {
    handleSubmit:(event)=>{
        event.preventDefault(); // cancela o evento
        let send = true; //true ou false para envio

        let inputs = form.querySelectorAll('input');

        validador.clearError();

        for(let i=0; i<inputs.length; i++) {
            let input = inputs[i];
            let check = validador.checkInput(input);
            if(check !== true) {
                send = false;
                validador.showError(input, check);            ;
            }
        }

        
        if(send) {
            form.submit();
        }
    },
    checkInput:(input) => {
        let rules = input.getAttribute('data-rules');
        if(rules !== null) {
            rules = rules.split('|');
            for(let k in rules) {
                let rDetails = rules[k].split('=');
                switch(rDetails[0]) {
                    case 'required':
                        if(input.value == '') {
                            return 'Campo não pode ser vazio'
                        }
                    break;
                    case 'min':
                        if(input.value.length < rDetails[1]) {
                            return `Campo precisa ter no mínimo ${rDetails[1]} caracteres`;
                        }
                    break;
                    case 'email':
                        if(input.value != "") {
                            let regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                            if(!regex.test(input.value.toLowerCase())) {
                                return 'E-mail digitado não é válido!';
                            }
                        }
                    break;
                }
            }
        }
        return true;
    },
    showError:(input, error) => {       
        input.style.color = '#ff0000';
        input.style.fontWeight = 'bold';

        let errorElement = document.createElement('div');
        errorElement.classList.add('error');
        errorElement.innerHTML = error;

        input.parentElement.insertBefore(errorElement, input); //parentElement sob um elemento, ou seja, vai para a div input--area, insertBefore(antes)
    },
    clearError:() => {
        let inputs = form.querySelectorAll('input');

        for(let i=0; i<inputs.length; i++) {
            inputs[i].style = '';
        }
        let errorElement = document.querySelectorAll('.error');
        for(let i=0; i<errorElement.length; i++) {
            errorElement[i].remove();

        }
    }
};
let form = document.querySelector('.validator');

//primeiro vamos fazer um bloqueio no envio pois o validador precisa se meter no meio do envio
form.addEventListener('submit', validador.handleSubmit); //vamos executar a função handSubmit quando tiver um submit no formulário