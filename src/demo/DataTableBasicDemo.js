import 'primeicons/primeicons.css';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.css';
import 'primeflex/primeflex.css';
import './index.css';

import React, { Component } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { LineService } from '../service/LineService';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';


import { classNames } from 'primereact/utils';
import { Toast } from 'primereact/toast';
import { FileUpload } from 'primereact/fileupload';
import { Rating } from 'primereact/rating';
import { InputNumber } from 'primereact/inputnumber';
import { Dialog } from 'primereact/dialog';

export class DataTableBasicDemo extends Component {

    emptyLine = {
        id: null,
        name: '',
        username: '',
        number: ''
    };

    constructor(props) {
        super(props);
        this.state = {
            lines: null,
            lineDialog: false,
            deleteLineDialog: false,
            deleteLinesDialog: false,
            line: this.emptyLine,
            selectedLines: null,
            submitted: false,
            globalFilter: null
        };

        this.lineService = new LineService();
        this.actionBodyTemplate = this.actionBodyTemplate.bind(this);

        this.openNew = this.openNew.bind(this);
        this.hideDialog = this.hideDialog.bind(this);
        this.saveLine = this.saveLine.bind(this);
        this.editLine = this.editLine.bind(this);
        this.confirmDeleteLine = this.confirmDeleteLine.bind(this);
        this.deleteLine = this.deleteLine.bind(this);
        this.exportCSV = this.exportCSV.bind(this);
        this.onCategoryChange = this.onCategoryChange.bind(this);
        this.onInputChange = this.onInputChange.bind(this);
        this.onInputNumberChange = this.onInputNumberChange.bind(this);
    }

    componentDidMount() {
        this.lineService.getLines().then(data => this.setState({ lines: data }));
    }

    openNew() {
        this.setState({
            line: this.emptyLine,
            submitted: false,
            lineDialog: true
        });
    }

    hideDialog() {
        this.setState({
            submitted: false,
            lineDialog: false
        });
    }

    hideDeleteLineDialog() {
        this.setState({ deleteLineDialog: false });
    }

    saveLine() {
        let state = { submitted: true };

        if (this.state.line.name.trim()) {
            let lines = [...this.state.lines];
            let line = { ...this.state.line };
            if (this.state.line.id) {
                const index = this.findIndexById(this.state.line.id);

                lines[index] = line;
                this.toast.show({ severity: 'success', summary: 'Successful', detail: 'Line Updated', life: 3000 });
            }
            else {
                line.id = this.createId();
                lines.unshift(line);
                this.toast.show({ severity: 'success', summary: 'Successful', detail: 'Line Created', life: 3000 });
            }

            state = {
                ...state,
                lines,
                lineDialog: false,
                line: this.emptyLine
            };
        }

        this.setState(state);
    }

    editLine(line) {
        this.setState({
            line: { ...line },
            lineDialog: true
        });
    }

    confirmDeleteLine(line) {
        this.setState({
            line,
            deleteLineDialog: true
        });
    }

    deleteLine() {
        let lines = this.state.lines.filter(val => val.id !== this.state.line.id);
        this.setState({
            lines,
            deleteLineDialog: false,
            line: this.emptyLine
        });
        this.toast.show({ severity: 'success', summary: 'Successful', detail: 'Line Deleted', life: 3000 });
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

    createId() {
        let id = '';
        let chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        for (let i = 0; i < 5; i++) {
            id += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return id;
    }

    exportCSV() {
        this.dt.exportCSV();
    }


    onCategoryChange(e) {
        let line = { ...this.state.line };
        line['category'] = e.value;
        this.setState({ line });
    }

    onInputChange(e, name) {
        const val = (e.target && e.target.value) || '';
        let line = { ...this.state.line };
        line[`${name}`] = val;

        this.setState({ line });
    }

    onInputNumberChange(e, name) {
        const val = e.value || 0;
        let line = { ...this.state.line };
        line[`${name}`] = val;

        this.setState({ line });
    }
    actionBodyTemplate(rowData) {
        return (
            <React.Fragment>
                <Button icon="pi pi-pencil" className="p-button-rounded p-button-success p-mr-2" onClick={() => this.editLine(rowData)} />
                <Button icon="pi pi-trash" className="p-button-rounded p-button-warning" onClick={() => this.confirmDeleteLine(rowData)} />
            </React.Fragment>
        );
    }

    render() {
        const lineDialogFooter = (
            <React.Fragment>
                <Button label="Cancel" icon="pi pi-times" className="p-button-text" onClick={this.hideDialog} />
                <Button label="Save" icon="pi pi-check" className="p-button-text" onClick={this.saveLine} />
            </React.Fragment>
        );
        const deleteLineDialogFooter = (
            <React.Fragment>
                <Button label="No" icon="pi pi-times" className="p-button-text" onClick={this.hideDeleteLineDialog} />
                <Button label="Yes" icon="pi pi-check" className="p-button-text" onClick={this.deleteLine} />
            </React.Fragment>
        );
        return (
            <div>
                <Toast ref={(el) => this.toast = el} />
                <div className="card">
                   
                    <div className='button'>
                        <Button icon="pi pi-plus" className="p-button-success" onClick={this.openNew} />
                    </div>
                    <DataTable
                        value={this.state.lines}
                        paginator
                        rows={5}
                        rowsPerPageOptions={[1, 2, 5]}
                        ref={(el) => this.dt = el}
                        selection={this.state.selectedLines}
                        onSelectionChange={(e) => this.setState({ selectedLines: e.value })}
                        dataKey="id">
                        <Column field="name" header="Name"></Column>
                        <Column field="username" header="Username"></Column>
                        <Column field="number" header="Number"></Column>
                        <Column body={this.actionBodyTemplate}></Column>
                    </DataTable>
                </div>
                <Dialog visible={this.state.lineDialog} style={{ width: '450px' }} header="New Line" modal className="p-fluid" footer={lineDialogFooter} onHide={this.hideDialog}>
                    <div className="p-field">
                        <label htmlFor="name">Name</label>
                        <InputText id="name" value={this.state.line.name} onChange={(e) => this.onInputChange(e, 'name')} required autoFocus className={classNames({ 'p-invalid': this.state.submitted && !this.state.line.name })} />
                        {this.state.submitted && !this.state.line.name && <small className="p-error">Name is required.</small>}
                    </div>
                    <div className="p-field">
                        <label htmlFor="username">Username</label>
                        <InputText id="username" value={this.state.line.username} onChange={(e) => this.onInputChange(e, 'username')} required autoFocus className={classNames({ 'p-invalid': this.state.submitted && !this.state.line.username })} />
                        {this.state.submitted && !this.state.line.username && <small className="p-error">Username is required.</small>}
                    </div>
                    <div className="p-field">
                        <label htmlFor="number">Number</label>
                        <InputNumber id="number" value={this.state.line.number} onValueChange={(e) => this.onInputNumberChange(e, 'number')} required autoFocus className={classNames({ 'p-invalid': this.state.submitted && !this.state.line.number })} />
                        {this.state.submitted && !this.state.line.number && <small className="p-error">Number is required.</small>}
                    </div>
                </Dialog>

                <Dialog visible={this.state.deleteLineDialog} style={{ width: '450px' }} header="Confirm" modal footer={deleteLineDialogFooter} onHide={this.hideDeleteLineDialog}>
                    <div className="confirmation-content">
                        <i className="pi pi-exclamation-triangle p-mr-3" style={{ fontSize: '2rem' }} />
                        {this.state.line && <span>Are you sure you want to delete <b>{this.state.line.name}</b>?</span>}
                    </div>
                </Dialog>

                
            </div>
        );
    }
}
