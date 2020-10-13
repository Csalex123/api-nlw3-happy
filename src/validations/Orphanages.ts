import * as Yup from 'yup';

const schema = Yup.object().shape({
    name: Yup.string().required('O nome é obrigatório'),
    latitude: Yup.number().required('A latitude é obrigatória'),
    longitude: Yup.number().required('A longitude é obrigatória'),
    about: Yup.string().required('O sobre é obrigatório').max(300),
    instructions: Yup.string('As instruções é obrigatória').required(),
    opening_hours: Yup.string('O horário de abertura é obrigatório').required(),
    open_on_weekends: Yup.boolean('O campo de abertura nos finais de semenas é obrigatório'),
    images: Yup.array(Yup.object().shape({
        path: Yup.string().required('A imagem é obrigatória')
    }))
});

export default schema;