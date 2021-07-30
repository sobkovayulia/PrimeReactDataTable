
import ReactDOM from 'react-dom';
import React from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { useFormik } from 'formik';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { classNames } from 'primereact/utils';
export const FormikFormDemo = () => {
    let state = {
        visible: false
    };
    const columns = [
        { header: "Name", field: "name" },
        { header: "Username", field: "username" },
        { header: "Number", field: "number" },
    ];
    var tableArray = [
        {
            name: 'name1', username: 'username1', number: '1'
        },
        {
            name: 'name2', username: 'username2', number: '2'
        },
        {
            name: 'name3', username: 'username3', number: '3'
        },
        {
            name: 'name4', username: 'username4', number: '4'
        },
        {
            name: 'name5', username: 'username5', number: '5'
        },
    ];
    const formik = useFormik({
        initialValues: {
            name: '',
            username: '',
            number: ''
        },
        validate: (data) => {
            let errors = {};

            if (!data.name) {
                errors.name = 'Name is required.';
            }
            if (!data.username) {
                errors.username = 'Username is required.';
            }
            if (!data.number) {
                errors.number = 'Number is required.';
            }

            return errors;
        }
    });


    const deleteline = () => {

        /* toast.show({ severity: 'success', summary: 'Видалено', life: 3000 }); */
    };
    const newLine = () => { //Вставити звуки
        var newNameValue = document.getElementById('input1').value;
        var newUsernameValue = document.getElementById('input2').value;
        var newNumberValue = document.getElementById('input3').value;

        var newName = document.getElementById('input1');
        var newUsername = document.getElementById('input2');
        var newNumber = document.getElementById('input3');


        if (newNameValue === "" || newUsernameValue === "" || newNumberValue === "") {

            /* toast.show({ severity: 'error', summary: 'Ви заповнили не усі поля', life: 3000 }); */
        }
        else {
            if (!parseInt(newNumberValue) && newNameValue.length >= 1 && newUsernameValue.length >= 1) {
                /* toast.show({ severity: 'error', summary: 'не число', life: 3000 }); */
            }
            else {
                var newTableArray = tableArray.unshift({ name: newNameValue, username: newUsernameValue, number: newNumberValue });
                console.log(newTableArray);
                /* toast.show({ severity: 'success', summary: 'Додано', life: 3000 }); */

                document.getElementById('input1').value = "";
                document.getElementById('input2').value = "";
                document.getElementById('input3').value = "";
                return false;
            }

        }

    };

    const isFormFieldValid = (name) => !!(formik.touched[name] && formik.errors[name]);


    const dynamicColumns = columns.map((col) => {
        return <Column key={col.field} field={col.field} header={col.header} />;
    });

    return (
        <div className="block">
            <form onSubmit={formik.handleSubmit} className="p-fluid">
                <div className="input">
                    <span className="p-float-label">
                        <InputText id="input1" name="name" onChange={formik.handleChange} autoFocus className={classNames({ 'p-invalid': isFormFieldValid('name') })} />
                        <label htmlFor="in" className={classNames({ 'p-error': isFormFieldValid('name') })} >Name</label>
                    </span>

                    <span className="p-float-label">
                        <InputText id="input2" name="username" onChange={formik.handleChange} autoFocus className={classNames({ 'p-invalid': isFormFieldValid('username') })} />
                        <label htmlFor="in" className={classNames({ 'p-error': isFormFieldValid('username') })}>Username</label>
                    </span>

                    <span className="p-float-label">
                        <InputText id="input3" name="number" onChange={formik.handleChange} autoFocus className={classNames({ 'p-invalid': isFormFieldValid('number') })} />
                        <label htmlFor="in" className={classNames({ 'p-error': isFormFieldValid('number') })}>Number</label>
                    </span>

                </div>
                <div className='button'>
                    <Button type="submit" id="id_button_new" icon="pi pi-plus" className="p-button-rounded p-button-success" onClick={newLine} />
                </div>
            </form>
            <div className='data_table' >
                <DataTable
                    id="data_table_id"
                    value={tableArray}
                    paginator rows={2}
                    selectionMode="singl"
                    selection={state.selected}
                    onSelectionChange={e => this.setState({ selected: e.value })}
                >
                    {dynamicColumns}
                </DataTable>
            </div>
        </div>
    );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<FormikFormDemo />, rootElement);