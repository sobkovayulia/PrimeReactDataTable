import React, { Component } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';
import { InputText } from 'primereact/inputtext';

export class DataTableDynamicDemo extends Component {
    emptyProduct = {
        name: '',
        username: '',
        password: ''
    };
    constructor(props) {
        super(props);

        this.state = {
            visible: false,
            strings: this.emptyProduct
        };
        this.newLine = this.newLine.bind(this);
        this.reject = this.reject.bind(this);
        this.columns = [
            { header: "Name", field: "name" },
            { header: "Username", field: "username" },
            { header: "Password", field: "password" }
        ];

        this.sale = [
            {
                name: 'чсмчичичвичвпріре', username: 'аявамявмавам', password: 'вапвпав'
            },
            {
                name: 'амчсмчмчмчивчаи', username: 'аявамявпрвагапвмавам', password: 'впаяваппф'
            },
            {
                name: 'ваияаміявм', username: 'ірврківрікр', password: 'впачвпрвпруі'
            },
            {
                name: 'аявамявмавам', username: 'ікппачва', password: 'впаіру'
            },
            {
                name: 'амвапіпіікрі', username: 'впвпрачпр', password: 'пчвап'
            },
        ];
    }
    reject() {
        this.toast.show({ severity: 'success', summary: 'Видалено', life: 3000 });
    }
    newLine() {
        /* var newName = document.getElementById('input1').value;
        var newUsername = document.getElementById('input2').value;
        var newPassword = document.getElementById('input3').value;

        var newSale = [{name: newName, username: newUsername, password: newPassword}]; */
        
        var newSale = this.sale.unshift({name: document.getElementById('input1').value, username:document.getElementById('input2').value, password: document.getElementById('input3').value })

        console.log(newSale);
        this.toast.show({ severity: 'success', summary: 'Додано', life: 3000 });
    }
    render() {
        const dynamicColumns = this.columns.map((col, i) => {
            return <Column key={col.field} field={col.field} header={col.header} />;
        });

        return (
            <div>
                <Toast ref={(el) => this.toast = el} />
                <div className="input">

                    <span className="p-float-label">
                        <InputText id='input1' />
                        <label htmlFor="in">Name</label>
                    </span>

                    <span className="p-float-label">
                        <InputText id='input2' />
                        <label htmlFor="in">Username</label>
                    </span>

                    <span className="p-float-label">
                        <InputText id='input3' />
                        <label htmlFor="in">Password</label>
                    </span>

                </div>
                <div className='button'>
                    <Button id="id_button_new" icon="pi pi-plus" className="p-button-rounded p-button-success p-button-outlined" onClick={this.newLine} />
                    <Button id="id_button_delete" onClick={this.reject} icon="pi pi-trash" className="p-button-rounded p-button-danger p-button-outlined" />
                </div>
                <div className='data_table' >
                    <DataTable
                        id="data_table_id"
                        value={this.sale}
                        paginator rows={2}
                        selectionMode="single"
                        selection={this.state.selectedProduct1}
                        onSelectionChange={e => this.setState({ selectedProduct1: e.value })}
                    >
                        {dynamicColumns}
                    </DataTable>
                </div>

            </div>
        );
    }
}