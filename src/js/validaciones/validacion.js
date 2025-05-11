export const numeros = (input) => {
    input.addEventListener('input', function() {
        this.value = this.value.replace(/[^0-9]/g, '');
    });
};

export const caracteresEspeciales = (input) => {
    input.addEventListener('input', function() {
        this.value = this.value.replace(/[^\w\s.]/g, '');
    });
};

export const caracteresEspeciales__sin__espacios = (input) => {
    input.addEventListener('input', function() {
        this.value = this.value.replace(/[^a-zA-Z0-9]/g, '');
    });
};


export const longitud = (input,hasta) => {

    input.addEventListener('input', function() {

        if($(input).val().length > hasta){

            $(input).val($(input).val().substr(0, hasta));

        }

    });
    
}

export const numeros__montos = (input) => {

    input.addEventListener('input', function() {

        this.value = this.value.replace(/[^0-9.]/g, '');

        if (this.value.includes('.')) {
            const parts = this.value.split('.');
            parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, '');
            parts[1] = parts[1].slice(0, 2);
            this.value = parts.join('.');
        }

    });

};




