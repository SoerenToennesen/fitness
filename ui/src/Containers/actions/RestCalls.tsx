
export function createRest(URL: string, body: any) {
    return fetch(
        URL, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        }).then(res => {
        if (res.status !== 200) {
            return {notify: {isOpen: true, message: 'Creation failed [insert failure message from backend]', type: 'error'}};
        } else {
            return {notify: {isOpen: true, message: 'Created successfully', type: 'success'}}
        }
    }).catch(error => {
        alert(error);
    });
}

export function updateRest(URL: string, body: any) {
    return fetch(
        URL, {
        method: 'PUT',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    }).then(res => {
        if (res.status !== 200) {
            return {notify: {isOpen: true, message: 'Update failed [insert failure message from backend] ', type: 'error'}};
        } else {
            return {notify: {isOpen: true, message: 'Updated successfully', type: 'success'}}
        }
    }).catch(error => {
        alert(error);
    });
}

export function deleteRest(URL: string, id: string) {
    return fetch(URL, {
        method: 'DELETE',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: id
    }).then(res => {
        if (res.status !== 200) {
            return {notify: {isOpen: true, message: 'Deletion failed [insert failure message from backend] ', type: 'error'}};
        } else {
            return {notify: {isOpen: true, message: 'Delete successfully', type: 'success'}}
        }
    }).catch(error => {
        alert(error);
    });
}
