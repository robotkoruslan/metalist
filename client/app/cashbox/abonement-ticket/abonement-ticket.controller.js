export default class AbonementTicketController {

    constructor( StadiumMetalist ) {
        'ngInject';
        this.message = '';
        console.log('AbonementTicketController');
    }

    $onInit() {
        this.message = '';
    }

}