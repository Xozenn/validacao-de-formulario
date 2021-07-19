class validaFormulario {
    constructor() {
        this.formulario = document.querySelector('.formulario');
        this.eventos();
    }

    eventos() {
        this.formulario.addEventListener('submit', e => {
            this.handleSubmit(e);
        });
    }
    handleSubmit(e) {
        e.preventDefault();
        //console.log('formulário não enviado');
        const camposValidos = this.validaCampos();//vai ter q retornar algo
        const senhaValida = this.passwordValid();

        if(camposValidos && senhaValida){
            alert('Formulário enviado');
            this.formulario.submit();
        }
    }

    //assumir q os campos são válidos e se não for válido a flag recebe false e vai ser retornado o valid
    validaCampos() {
        let valid = true;// -> fala se o formulário pode ou não ser enviado

        for (let errorText of this.formulario.querySelectorAll('.error-text')) {
            errorText.remove();
        }

        /* for (let campo of this.formulario.querySelectorAll('.valid')) {
            campo.classList.add('valido');
        } */

        //tenho controle de quais campos estão sendo validados
        for (let campo of this.formulario.querySelectorAll('.valid')) {
            //a mensagem vem daqui então vou criar dentro do for pra saber qual campo tá errado
            const label = campo.previousElementSibling.innerText;
            //console.log(campo);
            if (!campo.value) {
                this.createError(campo, `"${label}" não pode estar vazio`);
                valid = false; //já não é mais válido
            }

            if (campo.classList.contains('cpf')) {
                //passar o campo pq vou criar um erro dps do campo
                if (!this.validarCPF(campo)) valid = false;
            }

            if (campo.classList.contains('usuario')) {
                if (!this.validaUsuario(campo)) valid = false;
            }
        }
        return valid;
    }

    validarCPF(campo) {
        const cpf = new ValidaCPF(campo.value);//minha classe de outro JS
        if (!cpf.valid()) {
            this.createError(campo, 'CPF inválido');
            return false;
        }
        return true;
    }

    validaUsuario(campo) {
        const usuario = campo.value;
        let valid = true;

        if (usuario.length < 3 || usuario.length > 12) {
            this.createError(campo, 'Usuário deve conter 3 a 12 caracteres');
            valid = false;
        }

        //repetidas vezes pq pode ser quantas letras e numeros a pessoa quiser
        if (!usuario.match(/^[a-zA-Z0-9]+$/g)) {
            this.createError(campo, 'Usuario precisa conter apenas letras e números');
            valid = false;
        }
        return valid;
    };

    passwordValid() {
        let valid = true;

        const senha = this.formulario.querySelector('.senha');
        const repetirSenha = this.formulario.querySelector('.repetir-senha');

        if (senha.value !== repetirSenha.value) {
            this.createError(repetirSenha, 'As senhas precisa ser iguais');
            valid = false;
        }

        if (senha.value.length < 6 || senha.value.length > 12) {
            valid = false;
            this.createError(senha, 'A senha precisa ter entre 6 e 12 caracteres');
        }

        return valid;
    }

    createError(campo, msg) {
        const div = document.createElement('i');
        div.innerHTML = msg;
        div.classList.add('fas');
        div.classList.add('fa-exclamation-circle');
        //insere um elemento depois do fim do elemento
        //insere a div erro depois do campo
        campo.insertAdjacentElement('afterend', div);
    }

}

const valida = new validaFormulario();