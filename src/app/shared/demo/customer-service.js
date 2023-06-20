
export class CustomerService {

    getCustomersSmall() {
        return fetch('data/customers-small.json').then(res => res.json())
                .then(d => d.data);
    }

    getCustomersMedium() {
        return fetch('data/customers-medium.json').then(res => res.json())
                .then(d => d.data);
    }

    getCustomersLarge() {
        return fetch('data/customers-large.json').then(res => res.json())
                .then(d => d.data);
    }

    getCustomersXLarge() {
        return fetch('data/customers-xlarge.json').then(res => res.json())
                .then(d => d.data);
    }

}
     