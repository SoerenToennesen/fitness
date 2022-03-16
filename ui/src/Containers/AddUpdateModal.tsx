import React from 'react';
import nutrition_picture from "../Photos/users/defaultuser.png";

// TODO: Implement me
//imageUpload = (e: any) => {
//
//}

function InputText(props: any) {
    const { inputTexts, setInputTexts } = props;
    return (
        <div>
            {inputTexts.map((inputText: any) =>
                <div className="input-group mb-3">
                    <span className="input-group-text">{inputText.type}</span>
                    <input type="text" className="form-control"
                        placeholder={inputText.placeholder}
                        value={inputText.input}
                        onChange={(e) =>
                            setInputTexts({...inputTexts, input: e.target.value})
                        }
                    ></input>
                </div>
            )}
        </div>
    );
}

function InputDropdown(props: any) {
    const { inputDropdowns, setInputDropdowns } = props;
    return (
        <div>
            {inputDropdowns.map((inputDropdown: any) =>
                <div className="input-group mb-3">
                    <span className="input-group-text">Title</span>
                    <select
                        className="form-select"
                        placeholder={inputDropdown.placeholder}
                        value={inputDropdown.input}
                        onChange={(e) =>
                            setInputDropdowns({...inputDropdowns, input: e.target.value})
                        }
                    >
                        {inputDropdowns.options.map((option: any) =>
                            <option key={option.id}>
                                {option.value}
                            </option>)
                        }
                    </select>
                </div>
            )}
        </div>
    );
}

function InputImage(props: any) {
    const { inputImage, setInputImage } = props;
    return (
        <div className="p-2 w-50 bd-highlight">
            <img height="100px"
                 src={inputImage.src}
                 alt={inputImage.alt}/>
            <input
                className="m-2"
                type="file"
                onChange={(e) =>
                    setInputImage({...inputImage}) // TODO: Image upload & set function
                }
            />
        </div>
    );
}

export default function AddUpdateModal(props: any) {
    const { modalData, setModalData } = props;
    return (
        <div className="modal fade" id="exampleModal" tabIndex={-1} aria-hidden="true">
            <div className="modal-dialog modal-lg modal-dialog-centered">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">
                            {modalData.title}
                        </h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
                    </div>
                    <div className="modal-body">
                        <div className="d-flex flex-row bd-highlight mb-3">
                            <div className="p-2 w-50 bd-highlight">
                                <InputText
                                    inputTexts={modalData.inputTexts}
                                    setInputTexts={(nextState: any) => setModalData({...modalData, inputTexts: nextState})}
                                />
                                <InputDropdown
                                    inputDropdowns={modalData.inputDropdowns}
                                    setInputDropdowns={(nextState: any) => setModalData({...modalData, inputDropdowns: nextState})}
                                />
                            </div>
                            <InputImage
                                inputImage={modalData.inputImage}
                                setInputImage={(nextState: any) => setModalData({...modalData, inputImage: nextState})}
                            />
                        </div>
                        <button
                            type="button"
                            data-bs-toggle="modal"
                            data-bs-target="#exampleModal"
                            className="btn btn-primary float-start data-bs-dismiss"
                            onClick={() => // TODO: we might be able to not do anything here (as everything is already set)
                                setModalData({...modalData, createOrUpdateClicked: true}) // TODO: createClick or updateClick from caller class depending on this.state.updateOrCreateModal
                            }
                        >
                            {modalData.buttonTitle}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}