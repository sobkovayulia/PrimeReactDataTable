import React, { Component } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';
import { InputText } from 'primereact/inputtext';
import { Dialog } from 'primereact/dialog';

import { classNames } from 'primereact/utils';

export class DataTableDynamicDemo extends Component {
    emptyColumns = {
        id: null,
        name: '',
        username: '',
        number: ''
    };
    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            deleteProductDialog: false,
            lines: null,
            productDialog: false,
            deleteProductsDialog: false,
            line: this.emptyColumns,
            selectedProducts: null,
            submitted: false
        };

        this.newLine = this.newLine.bind(this);
        this.delete = this.delete.bind(this);
        this.actionBodyTemplate = this.actionBodyTemplate.bind(this);
        this.confirmDeleteProduct = this.confirmDeleteProduct.bind(this);
        this.hideDeleteProductDialog = this.hideDeleteProductDialog.bind(this);
        this.deleteProduct = this.deleteProduct.bind(this);
        this.editProduct = this.editProduct.bind(this);
        this.onInputChange = this.onInputChange.bind(this);
        this.hideDialog = this.hideDialog.bind(this);

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
    delete() {


        /* var description = document.getElementById();
        description.parentNode.removeChild(description); */



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
    actionBodyTemplate(rowData) {
        return (
            <React.Fragment>
                <Button icon="pi pi-pencil" className="p-button-rounded p-button-success p-mr-2 p-button-text" onClick={() => this.editProduct(rowData)} />
                <Button icon="pi pi-trash" className="p-button-rounded p-button-danger p-button-text" onClick={() => this.confirmDeleteProduct(rowData)} />
            </React.Fragment>
        );
    }
    confirmDeleteProduct(line) {
        this.setState({
            line,
            deleteProductDialog: true
        });
    }
    deleteProduct() {
        let lines = this.tableArray.filter(currentValue => currentValue > 50);
        this.setState({
            lines,
            deleteProductDialog: false,
            line: this.emptyColumns
        });
        console.log(lines);
        this.toast.show({ severity: 'success', summary: 'Successful', detail: 'Product Deleted', life: 3000 });
    }
    hideDeleteProductDialog() {
        this.setState({ deleteProductDialog: false });
    }
    hideDialog() {
        this.setState({
            submitted: false,
            productDialog: false
        });
    }
    editProduct(line) {
        this.setState({
            line: { ...line },
            productDialog: true
        });
    }
    onInputChange(e, name) {
        const val = (e.target && e.target.value) || '';
        let line = {...this.state.line};
        line[`${name}`] = val;

        this.setState({ line });
    }
    findIndexById(id) {
        let index = -1;
        for (let i = 0; i < this.state.lines.length; i++) {
            if (this.state.lines[i].id === id) {
                index = i;
                break;
            }
        }
        return index;
    }

    render() {
        const deleteProductDialogFooter = (
            <React.Fragment>
                <Button label="No" icon="pi pi-times" className="p-button-text" onClick={this.hideDeleteProductDialog} />
                <Button label="Yes" icon="pi pi-check" className="p-button-text" onClick={this.deleteProduct} />

            </React.Fragment>
        );
        const productDialogFooter = (
            <React.Fragment>
                <Button label="Cancel" icon="pi pi-times" className="p-button-text" onClick={this.hideDialog} />
                <Button label="Save" icon="pi pi-check" className="p-button-text" onClick={this.saveProduct} />
            </React.Fragment>
        );
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
                        className="p-button-outlined p-button-success" onClick={this.newLine} />
                    <Button label="Delete" type="submit" id="id_button_delete" icon="pi pi-trash" className="p-button-outlined p-button-danger" onClick={this.delete} />
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
                        <Column body={this.actionBodyTemplate}></Column>
                    </DataTable>
                </div>
                <Dialog visible={this.state.deleteProductDialog} style={{ width: '450px' }} header="Confirm" modal footer={deleteProductDialogFooter} onHide={this.hideDeleteProductDialog}>
                    <div className="confirmation-content">
                        <i className="pi pi-exclamation-triangle p-mr-3" style={{ fontSize: '2rem' }} />
                        {this.state.line && <span>Are you sure you want to delete <b>{this.state.line.name}</b>?</span>}
                    </div>
                </Dialog>
                <Dialog visible={this.state.productDialog} style={{ width: '450px' }} header="Product Details" modal className="p-fluid" footer={productDialogFooter} onHide={this.hideDialog}>
                   
                    <div className="p-field">
                        <label htmlFor="name">Name</label>
                        <InputText id="input1" value={this.state.line.name} onChange={(e) => this.onInputChange(e, 'name')} required autoFocus className={classNames({ 'p-invalid': this.state.submitted && !this.state.product.name })} />
                        {this.state.submitted && !this.state.line.name && <small className="p-error">Name is required.</small>}
                    </div>
                </Dialog>
            </div>
        );
    }
}