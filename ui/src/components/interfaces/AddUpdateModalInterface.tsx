
interface MyOption {
    id: string,
    value: string,
}
interface MyOptions extends Array<MyOption>{}

interface MyNutritionInputText {
    type: string,
    placeholder: string,
    input: string,
}
interface MyNutritionInputTexts extends Array<MyNutritionInputText>{}

interface MyNutritionDropdown {
    options: MyOptions,
    placeholder: string,
    input: string,
}
interface MyNutritionDropdowns extends Array<MyNutritionDropdown>{}

interface MyImage {
    src: any,
    alt: string,
}

export interface MyModalData {
    id: string,
    title: string,
    inputTexts: MyNutritionInputTexts,
    inputDropdowns: MyNutritionDropdowns,
    inputImage: MyImage,
    buttonTitle: string,
    createOrUpdateClicked: boolean,
}