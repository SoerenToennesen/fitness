import {api_urls} from "../../Api_urls";

//TODO: Implement this file to replace

export function createRest(URL: string, body: any) {
    // TODO: Fix this POST call
    fetch(api_urls.NUTRITION_URL, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    })
        .then(res => {
            res.json();
        }, (error) => {
            return ({
                notify: {isOpen: true, message: 'Creation failed [insert failure message from backend] ' + error, type: 'error'},
            });
        })
    // TODO: Make the below into a resetState function that update also uses
    return ({
        notify: {isOpen: true, message: 'Created successfully', type: 'success'},
    });
}

export function updateRest(URL: string, body: any) {
    var returnMessage = {
        notify: {isOpen: true, message: 'Updated successfully', type: 'success'},
    }
    fetch(URL, {
        method: 'PUT',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    })
        .then(res => {
            res.json();
        }, (error) => {
            returnMessage = {
                notify: {isOpen: true, message: 'Update failed [insert failure message from backend] ' + error, type: 'error'}
            };
        })
    return returnMessage;
}

export function deleteRest(URL: string, id: string) {
    var returnMessage = {
        notify: {isOpen: true, message: 'Deleted successfully', type: 'success'},
    }
    fetch(URL, {
        method: 'DELETE',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: id
    })
        .then(res => {
            res.json();
        }, (error) => {
            returnMessage = {
                notify: {isOpen: true, message: 'Deletion failed [insert failure message from backend] ' + error, type: 'error'}
            };
        })
    return returnMessage;
}
