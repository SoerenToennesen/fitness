import React from 'react';
import {api_urls} from "../../Api_urls";

//TODO: Implement this file to replace

export function createClick(modalData: any) {
    // TODO: Fix this POST call
    fetch(api_urls.NUTRITION_URL, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            id: null,
            calories: modalData.inputTexts[0].input,
            description: modalData.inputTexts[1].input,
            carbohydrates: modalData.inputTexts[2].input,
            fats: modalData.inputTexts[3].input,
            proteins: modalData.inputTexts[4].input,
            calcium: modalData.inputTexts[5].input,
            folate: modalData.inputTexts[6].input,
            iron: modalData.inputTexts[7].input,
            vitaminB6: modalData.inputTexts[8].input,
            vitaminB12: modalData.inputTexts[9].input,
            vitaminC: modalData.inputTexts[10].input,
            vitaminD: modalData.inputTexts[11].input,
            zinc: modalData.inputTexts[12].input,
            nutritionType: modalData.inputDropdowns[0].input,
            // TODO: Priority to add injestion time
        })
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

export function updateClick(modalData: any) {
    fetch(api_urls.NUTRITION_URL, {
        method: 'PUT',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            id: null,
            calories: modalData.inputTexts[0].input,
            description: modalData.inputTexts[1].input,
            nutritionType: modalData.inputDropdowns[0].input,
        })
    })
        .then(res => {
            res.json();
        }, (error) => {
            return ({
                notify: {isOpen: true, message: 'Update failed [insert failure message from backend] ' + error, type: 'error'},
            });
        })
    return ({
        notify: {isOpen: true, message: 'Updated successfully', type: 'success'},
    });
}

export function deleteClick(URL: string, id: string) {
    fetch(api_urls.NUTRITION_URL, {
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
            return ({
                notify: {isOpen: true, message: 'Deletion failed [insert failure message from backend] ' + error, type: 'error'}
            });
        })
    return ({
        confirmModal: {isOpen: false},
        notify: {isOpen: true, message: 'Deleted successfully', type: 'success'},
    });
}
