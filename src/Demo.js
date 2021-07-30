import React, { Component } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';
import { InputText } from 'primereact/inputtext';

export class DataTableDynamicDemo extends Component {
    emptyColumns = {
        name: '',
        username: '',
        number: '',
        id: null
    };
    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            line: this.emptyColumns
        };
        this.newLine = this.newLine.bind(this);
        this.delete = this.delete.bind(this);
        this.columns = [
            { header: "Name", field: "name" },
            { header: "Username", field: "username" },
            { header: "Number", field: "number" }
        ];
        this.tableArray = [
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
    }
    delete(e) {
        /* var description = document.getElementById();
        description.parentNode.removeChild(description); */

        var array = [...this.state.line]; // make a separate copy of the array
        var index = array.indexOf(e.target.value)
        if (index !== -1) {
            array.splice(index, 1);
            this.setState({ line: array });
        }

        this.toast.show({ severity: 'success', summary: 'Видалено', life: 3000 });
    }
    newLine() { //Вставити звуки
        var newNameValue = document.getElementById('input1').value;
        var newUsernameValue = document.getElementById('input2').value;
        var newNumberValue = document.getElementById('input3').value;

        if (newNameValue === "" || newUsernameValue === "" || newNumberValue === "") {

            this.toast.show({ severity: 'error', summary: 'Ви заповнили не усі поля', life: 3000 });
        }
        else {
            if (!parseInt(newNumberValue) && newNameValue.length >= 1 && newUsernameValue.length >= 1) {
                this.toast.show({ severity: 'error', summary: 'не число', life: 3000 });
            }
            else {
                var newTableArray = this.tableArray.unshift({ name: newNameValue, username: newUsernameValue, number: newNumberValue });
                console.log(newTableArray);
                this.toast.show({ severity: 'success', summary: 'Додано', life: 3000 });

                document.getElementById('input1').value = "";
                document.getElementById('input2').value = "";
                document.getElementById('input3').value = "";
                return false;
            }
        }
    }
    render() {

        const dynamicColumns = this.columns.map((col) => {
            return <Column key={col.field} field={col.field} header={col.header} />;
        });
        return (
            <div className="block">
                <Toast ref={(el) => this.toast = el} />

                <div className="input">
                    <span className="p-float-label">
                        <InputText id="input1" />
                        <label htmlFor="in">Name</label>
                    </span>
                    <span className="p-float-label">
                        <InputText id='input2' />
                        <label htmlFor="in">Username</label>
                    </span>
                    <span className="p-float-label">
                        <InputText id='input3' />
                        <label htmlFor="in">Number</label>
                    </span>
                </div>
                <div className='button'>
                    <Button type="submit" id="id_button_new" icon="pi pi-plus"
                        className="p-button-rounded p-button-success" onClick={this.newLine} />
                    <Button type="submit" id="id_button_delete" icon="pi pi-trash"
                        className="p-button-rounded p-button-danger" onClick={this.delete} />
                </div>
                <div className='data_table' >
                    <DataTable
                        id="data_table_id"
                        value={this.tableArray}
                        paginator rows={2}
                        selectionMode="singl"
                        selection={this.state.selected}
                        onSelectionChange={e => this.setState({ selected: e.value })}
                    >
                        {dynamicColumns}
                    </DataTable>
                </div>
            </div>
        );
    }
}